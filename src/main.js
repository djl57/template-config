import Vue from 'vue'
import App from './App'
import router from './router'

import 'normalize.css/normalize.css' // 引入现代化Normalize.css，一种CSS reset的替代方案
import '@/styles/index.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
