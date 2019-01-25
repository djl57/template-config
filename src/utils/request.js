import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseUrl: process.env.BASE_API,
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(
  config => {
    console.log(store.getters.token) // null / admin
    if (store.getters.token) {
      config.headers['X-token'] = getToken()
    }
    return config
  },
  err => {
    console.log(`err: ${err}`)
    return Promise.reject(err)
  }
)
// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.message, // 消息文字
        type: 'error', // success/warning/info/error
        duration: 5 * 1000 // 显示时间
      })

      if (res.code !== 50008 
        ||res.code !== 50012
        ||res.code !== 50014 ) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录', // 内容message
          '确定登出', // 标题title
          {
            confirmButtonText: '重新登录', // 确定按钮的文本内容
            cancelButtonText: '取消', // 取消按钮的文本内容
            type: 'warning' // 用于显示图标
                            // success / info / warning / error
                            // 可用iconClass覆盖
          }
        )
        .then(() => {
          store.dispatch('FedLogOut')
          .then(() => location.reload())
        })
        .catch(() => console.log('cancel: 继续留在该页面'))
      }
      return Promise.reject('err')
    } else {
      return response.data
    }
  },
  err => {
    console.log(`err: ${err}`)
    Message({
      message: err.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(err)
  }
)

export default service