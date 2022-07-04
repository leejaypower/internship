import Vue from 'vue'
import axios from 'axios'
import { axiosErrorMap, customErrorMaker } from '@/services/errorHandling'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

window.onerror = (message, source, line, column, error) => {
  const newError = customErrorMaker({
    errorName: 'UNCAGHT_WINDOW_ERORR',
    message,
    stack: error.stack,
  })
  store.dispatch('errorStore/recordLog', newError)
  store.dispatch('snackBarStore/alertMessage', newError.alertMessage)
  return true
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = axiosErrorMap(error)
    throw new Error(errorMessage)
  },
)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
