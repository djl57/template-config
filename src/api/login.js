import request from '@/utils/request'
// console.log(request()) // Promise {<pending>}
const login = (username, passward) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      passward
    }
  })
}

const getInfo = (token) => {
  return request({
    url: '/user/info',
    method: 'get',
    param: { token }
  })
}

const logout = () => {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export {
  login, getInfo, logout
}