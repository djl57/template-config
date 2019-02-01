import router from './router'
import store from './store'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken/* , removeToken */ } from '@/utils/auth'
// import { curTimeStamp } from './utils'

const whiteList = ['/login']  // 不重定向白名单
router.beforeEach((to, from, next) => {
  // if (curTimeStamp() - getToken() > 10000) {
  //   removeToken()
  // }
  console.log(getToken())
  console.log(new Date().getTime())
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo') // 拉取用户信息
        .then(res => next())
        .catch((err) => {
          store.dispatch('FedLogOut')
          .then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 全部重定向到登录页
    }
  }
})