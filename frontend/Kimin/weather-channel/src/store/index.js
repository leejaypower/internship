import Vue from 'vue'
import Vuex from 'vuex'
import snackBarStore from './modules/snackBarStore'
import userInfoStore from './modules/userInfoStore'
import auth from './modules/auth'
import weatherStore from './modules/weatherStore'
import errorStore from './modules/errorStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    snackBarStore,
    userInfoStore,
    weatherStore,
    auth,
    errorStore,
  },
})
