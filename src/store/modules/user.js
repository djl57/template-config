import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: 'djlun',
    avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=173886539,2588581153&fm=27&gp=0.jpg',
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
      const username = userInfo.username.trim() // trim()去掉字符串的首尾空格
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
        .then(res => {
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
        })
        .catch(err => reject(err))
      })
    },

    // 登出
    LogOut: ({ commit, state }) => {
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
    }
  }
}

export default user