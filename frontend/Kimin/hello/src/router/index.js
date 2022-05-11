import Vue from 'vue'
import VueRouter from 'vue-router'
import hello from './hello'

Vue.use(VueRouter)

const routes = [
  ...hello,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
