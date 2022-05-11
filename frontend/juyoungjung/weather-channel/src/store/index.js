import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import weather from './modules/weather'

Vue.use(Vuex)
const isDev = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    weather,
  },
  strict: isDev, // when true, detecting inappropriate mutations
  plugins: isDev ? [Vuex.createLogger()] : [],
})
