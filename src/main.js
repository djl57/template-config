import Vue from 'vue'
import App from './App'
import router from './router'

import 'normalize.css/normalize.css' // 引入现代化Normalize.css，一种CSS reset的替代方案
import '@/styles/index.scss' // 全局css

// 按需引入element
import '@/components/element-ui'
// 国际化
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
