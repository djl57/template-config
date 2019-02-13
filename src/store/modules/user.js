import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    // name: 'djlun',
    // avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=173886539,2588581153&fm=27&gp=0.jpg',
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_NAME: (state, name) => state.name = name,
    SET_AVATAR: (state, avatar) => state.avatar = avatar,
    SET_ROLES: (state, roles) => state.roles = roles
  },

  actions: {
    // 登陆
    Login: ({ commit }, userInfo) => {
      console.log('进到登录action')
      const username = userInfo.username.trim() // trim()去掉字符串的首尾空格
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
        .then(res => {
          console.log('登录接口返回数据：' + JSON.stringify(res))
          const data = res.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        })
        .catch(err => reject(err))
      })
    },

    // 获取用户信息
    GetInfo: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
        .then(res => {
          const data = res.data
          if (data.roles && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(res)
          // reject('token错误') // 如果想走前端登出那个action的话开启
        })
        .catch(err => reject(err))
      })
    },

    // 登出
    LogOut: ({ commit, state }) => {
      console.log('进到登出actions')
      return new Promise((resolve, reject) => {
        logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        })
        .catch(err => reject(err))
      })
    },

    // 前端 登出
    FedLogOut: ({ commit }) => {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles: ({ commit, dispatch }, role) => {
      return new Promise(resolve => {
        // 这里切换的是权限，所以用户不需要重新登录
        // 实际开发过程中这里的逻辑还需要改
        // 这里为何要重新设置token？因为只是用来前端显示
        // 具体修改权限需要和后端配合实现
        commit('SET_TOKEN', role)
        setToken(role)
        getInfo(role) // 接 api 接口的时候要改
        .then(res => {
          const data = res.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user