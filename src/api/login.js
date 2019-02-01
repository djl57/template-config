import request from '@/utils/request'
// console.log(request()) // Promise {<pending>}
const login = (username, passward) => {
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     username,
  //     passward
  //   }
  // })
  return new Promise(resolve => {
    setTimeout(() => {
      let res = {
        code: 0,
        msg: '登录成功',
        data: {
          token: new Date().getTime() + ''
        }
      }
      resolve(res)
    }, 2000)
  })
}

const getInfo = (token) => {
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   param: { token }
  // })
  return new Promise(resolve => {
    setTimeout(() => {
      let res = {
        code: 0,
        msg: 'success',
        data: {
          name: 'djlun',
          avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=173886539,2588581153&fm=27&gp=0.jpg',
          roles: ['djlun', 'admin']
        }
      }
      resolve(res)
    }, 2000)
  })
}

const logout = () => {
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
  return new Promise(resolve => {
    console.log('进到登出接口')
    setTimeout(() => {
      let res = {
        code: 0,
        msg: '登出成功'
      }
      resolve(res)
    }, 2000)
  })
}

export {
  login, getInfo, logout
}