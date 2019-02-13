import router from './router'
import store from './store'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken/* , removeToken */ } from '@/utils/auth'
// import { curTimeStamp } from './utils'

// NProgress.configure({ showSpinner: false })

const hasPermission = (roles, permissionRoles) => {
  if (roles.includes('admin')) return true
  if (!permissionRoles) return true
  // try {
  console.log('permissionRoles', permissionRoles)
  return roles.some(role => permissionRoles.includes(role))
  // } catch (error) {
  //   Message.error('没有此页面的权限')
  // }
}

const whiteList = ['/login']  // 不重定向白名单

router.beforeEach((to, from, next) => {
  // if (curTimeStamp() - getToken() > 10000) {
  //   removeToken()
  // }
  // NProgress.start() // start progress bar
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      // NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo') // 拉取用户信息
        .then(res => {
          const roles = res.data.roles
          store.dispatch('GenerateRoutes', { roles }) // 根据权限生成可访问的路由表，此处为什么是传一个对象呢？
          .then(() => {
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        })
        .catch((err) => {
          store.dispatch('FedLogOut')
          .then(() => {
            Message.error(err)
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // 应该是指后台某个页面可以动态改变某个角色的权限
        // 如果想要动态增加角色呢？
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({
            path: '/401',
            replace: true,
            query: {
              noGoBack: true
            }
          })
        }
        // next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 全部重定向到登录页
      // NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

// router.afterEach(() => {
//   NProgress.done() // finish progress bar
// })