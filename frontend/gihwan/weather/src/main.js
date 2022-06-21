import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import './style/global.css'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueApexCharts)

Vue.component('ApexChart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
