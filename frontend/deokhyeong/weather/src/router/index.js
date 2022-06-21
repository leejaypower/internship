import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import auth from '@/service/domain/auth'
import store from '@/store/index'

Vue.use(VueRouter)

function duplicateNavigationHandler(location, onResolve, onReject, targetInterface, _this) {
  if (onResolve || onReject) { return targetInterface.call(_this, location, onResolve, onReject) }
  return targetInterface.call(_this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      // resolve err
      return err
    }
    // rethrow error
    return Promise.reject(err)
  })
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  return duplicateNavigationHandler(location, onResolve, onReject, originalReplace, this)
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  return duplicateNavigationHandler(location, onResolve, onReject, originalPush, this)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  duplicateNavigationPolicy: 'reload',
  routes,
})

const requireAuthGuard = async (next, { accessToken, refreshToken }) => {
  if (!accessToken && refreshToken) {
    const response = await store.dispatch('auth/refreshSignIn')
    if (response.status === 200) {
      auth.setTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })
    }
    next()
  } else if (!accessToken && !refreshToken) {
    next('/sign-in')
  } else {
    next()
  }
}

const noRequiresAuthGuard = (next, { accessToken }) => {
  if (accessToken) {
    next('/')
  } else {
    next()
  }
}

router.beforeEach((to, from, next) => {
  const { accessToken, refreshToken } = auth.getTokens()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    requireAuthGuard(next, { accessToken, refreshToken })
  }
  if (to.matched.some((record) => record.meta.noRequiresAuth)) {
    noRequiresAuthGuard(next, { accessToken })
  }
})

export default router
