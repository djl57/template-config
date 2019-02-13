import Layout from '@/views/layout'

const selfcss = {
  path: '/selfcss',
  component: Layout,
  name: 'Selfcss',
  redirect: 'noredirect',
  meta: {
    title: '玩转css',
    icon: 'selfcss'
  },
  children: [
    {
      path: 'card',
      component: () => import('@/views/selfcss/card'),
      name: 'Card',
      meta: {
        title: '纸张'
      }
    },
    {
      path: 'show',
      component: () => import('@/views/selfcss/show'),
      name: 'Show',
      meta: {
        title: 'show'
      }
    },
  ]
}

export default selfcss