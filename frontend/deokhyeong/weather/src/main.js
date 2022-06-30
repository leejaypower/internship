import Vue from 'vue'
import interceptors from '@/lib/fakeHttp/interceptor'
import fakeHttp from '@/lib/fakeHttp'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import windowErrorLogger from './plugins/windowErrorLogger'

window.onerror = (...arg) => windowErrorLogger(...arg, store)

Vue.config.productionTip = false

const { requestInterceptor, responseFailInterceptor } = interceptors
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
