import { storage } from '@/assets/global'

const app = {
  state: {
    sidebar: {
      opened: !+storage.getItem('sidebarStatus'), // true
      withoutAnimation: false // 无动画？
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.openen) {
        storage.setItem('sidebarStatus', 1)
      } else {
        storage.setItem('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      storage.setItem('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => state.device = device
  },
  actions: {
    ToggleSidebar: ({ commit }) => commit('TOGGLE_SIDEBAR'),
    CloseSidebar: ({ commit }, { withoutAnimation }) => {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice: ({ commit }, device) => {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app