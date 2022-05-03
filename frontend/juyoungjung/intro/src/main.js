import Vue from 'vue'
import VueTyperPlugin from 'vue-typer'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import './assets/styles/global.scss'

Vue.config.productionTip = false
Vue.use(VueTyperPlugin)

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
