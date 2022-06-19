import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/styles/global.scss'

dayjs.locale('ko')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
