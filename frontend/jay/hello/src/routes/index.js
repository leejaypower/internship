import Vue from 'vue'
import VueRouter from 'vue-router'
import MeView from '../views/MeView.vue'
import BarogoView from '../views/BarogoView.vue'
import MainView from '../views/MainView.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/main' },
    { path: '/main', component: MainView },
    { path: '/me', component: MeView },
    { path: '/barogo', component: BarogoView },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})
