import Vue from 'vue'
import Vuex from 'vuex'
import modalStore from './modules/modalStore'
import userStore from './modules/userStore'
import careerStore from './modules/careerStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modalStore,
    userStore,
    careerStore,
  },
})
