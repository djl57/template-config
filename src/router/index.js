import Vue from 'vue'
import Router from 'vue-router'
import selfcss from './modules/selfcss'

Vue.use(Router)

const Layout = () => import('@/views/layout')

export const constRouters = [
  { 
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashBoard'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  },

  selfcss
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

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svgIcons/index'),
        name: 'Icons',
        meta: { title: '图标', icon: 'icon', noCache: true }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '参考文档', icon: 'link' }
      }
    ]
  }

]
