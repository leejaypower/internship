import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import weather from './weather'
import loading from './loading'
import error from './error'
import alert from './alert'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    weather,
    loading,
    error,
    alert,
  },
})
