import Vue from 'vue'
import VueRouter from 'vue-router'
import weather from './weather/index'

Vue.use(VueRouter)

const routes = weather

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  const hasToken = localStorage.getItem('accessToken')
  if (to.meta.authRequired && !hasToken) {
    router.push('/')
  } else {
    next()
  }
})

export default router
