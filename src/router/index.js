import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Layout = () => import('@/views/layout')

export const constRouters = [
  { 
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  // {
  //   path: '/404',
  //   component: () => import('@/views/errorPage/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/errorPage/401'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashBoard')
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '外链', icon: 'link' }
      }
    ]
  }
]

const routers = new Router({
  // mode: 'history', // 需后端支持
  // scrollBehavior: () => ({y: 0}),
  scrollBehavior: (to, from, savePosition) => {
    // console.log(to)
    // console.log(from)
    // console.log(savePosition)
  },
  routes: constRouters
})

export default routers

export const asyncRouters = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: '权限',
      icon: 'lock',
      roles: ['djlun', 'admin']
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限'
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
