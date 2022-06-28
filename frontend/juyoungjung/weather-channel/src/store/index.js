import Vue from 'vue'
import Vuex from 'vuex'
import * as modules from './modules'

Vue.use(Vuex)
const isDev = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules,
  strict: isDev, // when true, detecting inappropriate mutations
})

export default store
