import Vue from 'vue'
import App from './App.vue'
import VueRouter from './routes/index'
import MainButton from './components/MainButton.vue'
import './assets/css/global.css'

Vue.config.productionTip = false

Vue.component('MainButton', MainButton)

new Vue({
  render: (h) => h(App),
  router: VueRouter,
}).$mount('#app')
