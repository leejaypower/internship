import Vue from 'vue'
import Vuex from 'vuex'
import snackBarStore from './modules/snackBarStore'
import userInfoStore from './modules/userInfoStore'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    snackBarStore, userInfoStore, auth,
  },
})
