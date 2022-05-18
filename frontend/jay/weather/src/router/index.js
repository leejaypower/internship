import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/here-weather',
  },
  {
    path: '/here-weather',
    component: () => import('@/views/HereWeather.vue'),
  },
  {
    path: '/here-weekly-weather',
    component: () => import('@/views/HereWeeklyWeather.vue'),
  },
  {
    path: '/other-regions-weather',
    component: () => import('@/views/OtherRegionsWeather.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
