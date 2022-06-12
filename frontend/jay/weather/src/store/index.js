import Vue from 'vue'
import Vuex from 'vuex'
import userStore from '@/store/modules/userStore'
import alertStore from '@/store/modules/alertStore'
import authStore from '@/store/modules/authStore'
import locationStore from '@/store/modules/locationStore'
import weatherStore from '@/store/modules/weatherStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore,
    alertStore,
    authStore,
    locationStore,
    weatherStore,
  },
})
