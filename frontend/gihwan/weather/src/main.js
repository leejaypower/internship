import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import './style/global.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import { browserError, vueError, axiosErorr } from './services/error'

Vue.use(VueApexCharts)

Vue.component('ApexChart', VueApexCharts)

Vue.config.productionTip = false

window.onerror = browserError
Vue.config.errorHandler = vueError
axiosErorr()

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
