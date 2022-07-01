import Vue from 'vue'
import { requestVerify, responseVerify } from '@/sevices/auth'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import fakeAxios from './util/api/fakeAxios'
import { MapWindowError, MapPromiseError, MapvueError } from './sevices/error'

Vue.config.productionTip = false

Vue.config.errorHandler = (err, vm, info) => {
  const errorInfo = MapvueError(err, vm, info)
  store.dispatch('errorStore/handleUnpredictableError', errorInfo)
}

window.onerror = async (message, source, line, column, error) => {
  const errorInfo = MapWindowError(message, source, line, column, error)
  store.dispatch('errorStore/handleUnpredictableError', errorInfo)
}

window.onunhandledrejection = async (event) => {
  const { promise, reason } = event
  const errorInfo = MapPromiseError(promise, reason)
  store.dispatch('errorStore/handleUnpredictableError', errorInfo)
  event.preventDefault()
}

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
