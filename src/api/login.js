import request from '@/utils/request'

const login = (username, passward) => {
  return new Promise(resolve => {
    setTimeout(() => {
      let res = {
        code: 0,
        msg: '登录成功',
        data: {
          token: new Date().getTime() + username
        }
      }
      resolve(res)
    }, 800)
  })
}

const getInfo = (token) => {
  return new Promise(resolve => {
    setTimeout(() => {
      let res = {
        code: 0,
        msg: 'success',
        data: {
          name: 'djlun',
          avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=173886539,2588581153&fm=27&gp=0.jpg',
          roles: ['admin']
        }
      }
      resolve(res)
    }, 800)
  })
}

const logout = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      let res = {
        code: 0,
        msg: '登出成功'
      }
      resolve(res)
    }, 800)
  })
}

export {
  login, getInfo, logout
}

