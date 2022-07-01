import store from '@/store'
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
  const today = new Date()
  const now = today.getMonth() + 1
  const rightNow = today.getTime()
  const storeToken = store.getters['authStore/token']
  if (to.meta.auth && !store.getters['userStore/isLogin']) {
    next('/')
  }
  if (to.meta.auth && store.getters['userStore/isLogin']) {
    if (storeToken.exp < 13 && storeToken.exp < now) {
      // jwt token으로 로그인 되어있을 경우(관리자 로그인) 토큰 유효기간이 월 단위입니다.
      next('/')
    }
    if (storeToken.exp > 13 && storeToken.exp < rightNow) {
      // fake token으로 로그인 되어있을 경우 유효기간은 초 단위입니다.
      next('/')
    }
  }
  next()
})

export default router
