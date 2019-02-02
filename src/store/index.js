import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from './modules/app'
import user from './modules/user'
import errorLog from './modules/errorLog';
import permission from './modules/permission'
import tagsView from './modules/tagsView'

import getters from './getters'

const store = new Vuex.Store({
  modules: {
    app,
    user,
    errorLog,
    permission,
    tagsView
  },
  getters
})

export default store