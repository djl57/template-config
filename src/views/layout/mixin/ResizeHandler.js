import store from '@/store'

const { body } = document // 解构赋值
const WIDTH = 1024
const RATIO = 3 // 比率

export default {
  // 此方法好像没什么用
  // watch: {
  //   $route(route) {
  //     console.log(`layout的$route，打印this.device：${this.device}`)
  //     if (this.device === 'mobile' && this.sidebar.opened) {
  //       store.dispatch('CloseSideBar', { withoutAnimation: false })
  //     }
  //   }
  // },
  beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted () {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('ToggleDevice', 'mobile')
      store.dispatch('CloseSideBar', {
        withoutAnimation: true
      })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler () {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')
        if (isMobile) {
          store.dispatch('CloseSideBar', {
            withoutAnimation: true
          })
        }
      }
    }
  }
}