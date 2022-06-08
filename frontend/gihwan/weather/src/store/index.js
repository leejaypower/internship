import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import weather from './weather'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    weather,
  },
})
