import Vue from 'vue'
import { requestVerify, responseVerify } from '@/sevices/auth/index'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import fakeAxios from './util/api/fakeAxios'

Vue.config.productionTip = false

fakeAxios.setPreInterceptor(requestVerify)

fakeAxios.setPostInterceptor(
  (originRequest, response) => responseVerify(originRequest, response, store),
)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
