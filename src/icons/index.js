import Vue from 'vue'
import SvgIcon from '@/components/svgIcon'

// 注册全局组件
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
console.log(requireAll(req))
