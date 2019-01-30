import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Layout = () => import('@/views/layout')

// 加export的原因？
// 不需要动态判断权限的路由
export const constantRouterMap = [
  /* 
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  */
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/',
    // 写 path: '', 的原因？
    // path: '',
    component: Layout,
    redirect: '/dashboard',
    // redirect: 'dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashBoard'),
        // name: 'Dashboard',
        // meta: {
        //   title: '首页',
        //   icon: 'dashboard',
        //   noCache: true // 不会被 keep-alive 缓存
        // }
      }
    ]
  },
  /* 
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
  */
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

export default new Router({
  // mode: 'history', // 需后端支持
  // scrollBehavior: () => ({y: 0}),
  scrollBehavior: (to, from, savePosition) => {
    console.log(to)
    console.log(from)
    console.log(savePosition)
  },
  routes: constantRouterMap
})

// 需要动态判断权限并通过 addRouters 动态添加的路由
export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // 根路由会一直显示
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // 设置该路由进入的权限
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // 设置该路由进入的权限，可以只设置一个
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // 如果没有设置roles，意味着进入这个路由不需要鉴权
  //       }
  //     }
  //   ]
  // },
]
