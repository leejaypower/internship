import Vue from 'vue'
import interceptors from '@/lib/fakeHttp/interceptor'
import fakeHttp from '@/lib/fakeHttp'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

const { requestInterceptor, responseFailInterceptor } = interceptors

Vue.config.productionTip = false

fakeHttp.setRequestInterceptor(
  (config) => requestInterceptor(config, router),
)

fakeHttp.setResponseInterceptor(
  (error, config) => responseFailInterceptor(error, config, store, router),
)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
