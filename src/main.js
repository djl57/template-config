import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' // store等需要用到的时候再引

import 'normalize.css/normalize.css' // 引入现代化Normalize.css，一种CSS reset的替代方案
import '@/styles/index.scss' // 全局css

import '@/components/element-ui' // 按需引入element
import lang from 'element-ui/lib/locale/lang/en' // 国际化
import locale from 'element-ui/lib/locale'
locale.use(lang)

// import '@/icons' // 暂时跳过
// import '@/permission' // 权限控制，暂时跳过

import { storage } from './assets/global'
Vue.prototype.$storage = storage

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
