import store from '@/store/index'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/here-weather',
  },
  {
    path: '/here-weather',
    component: () => import('@/views/HereWeather.vue'),
  },
  {
    path: '/here-weekly-weather',
    component: () => import('@/views/HereWeeklyWeather.vue'),
    meta: { auth: true },
  },
  {
    path: '/other-regions-weather',
    component: () => import('@/views/OtherRegionsWeather.vue'),
    meta: { auth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters['userStore/isLogin']) {
    next('/here-weather')
  } else next()
})

export default router
