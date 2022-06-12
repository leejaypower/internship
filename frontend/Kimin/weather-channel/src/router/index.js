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

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name !== 'NavigationDuplicated') throw err
  })
}

export default router
