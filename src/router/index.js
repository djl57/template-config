import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Layout = () => import('@/views/layout')

const routers = new Router({
  // mode: 'history', // 需后端支持
  // scrollBehavior: () => ({y: 0}),
  scrollBehavior: (to, from, savePosition) => {
    console.log(to)
    console.log(from)
    console.log(savePosition)
  },
  routes: [
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
})

export default routers