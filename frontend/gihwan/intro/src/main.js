import Vue from 'vue'
import App from './App.vue'
import './style/reset.css'
import './style/common.css'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
