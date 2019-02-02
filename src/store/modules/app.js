import { getSidebarStatus, setSidebarStatus } from '@/utils/storage'

const app = {
  state: {
    sidebar: {
      opened: !+getSidebarStatus(), // true
      withoutAnimation: false // 无动画？
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened ? setSidebarStatus(1) : setSidebarStatus(0)
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      setSidebarStatus(1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => state.device = device
  },
  actions: {
    ToggleSideBar: ({ commit }) => commit('TOGGLE_SIDEBAR'), // 解构赋值的写法
    CloseSideBar: ({ commit }, { withoutAnimation }) => commit('CLOSE_SIDEBAR', withoutAnimation),
    ToggleDevice: ({ commit }, device) => commit('TOGGLE_DEVICE', device)
  }
}

export default app