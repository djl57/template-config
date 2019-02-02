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
    }, 200)
  })
}

const getInfo = (token) => {
  let role
  if (token.includes('admin')) role = ['admin']
  if (token.includes('djlun')) role = ['djlun']
  if (token.includes('test')) role = ['test']
  return new Promise(resolve => {
    setTimeout(() => {
      let res = {
        code: 0,
        msg: 'success',
        data: {
          name: 'djlun',
          avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=173886539,2588581153&fm=27&gp=0.jpg',
          roles: role
        }
      }
      resolve(res)
    }, 200)
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
    }, 200)
  })
}

export {
  login, getInfo, logout
}

