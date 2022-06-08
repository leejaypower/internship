import Vue from 'vue'
import VueRouter from 'vue-router'
import { AuthHub, LoginView, SignupView } from '@/views/auth'
import { CurrentLocation, WeatherHub } from '@/views/weather'
import { MyPageHub, UserInfo } from '@/views/mypage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/weather',
    name: 'weather',
    redirect: { name: 'current' },
    component: WeatherHub,
    children: [
      {
        path: 'current',
        name: 'current',
        component: CurrentLocation,
      },
    ],
  },
  {
    path: '/mypage',
    name: 'mypage',
    redirect: { name: 'edit' },
    component: MyPageHub,
    children: [
      {
        path: 'edit',
        name: 'edit',
        component: UserInfo,
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'login' },
    component: AuthHub,
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginView,
      },
      {
        path: 'signup',
        name: 'signup',
        component: SignupView,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savaPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
      }
    }
    if (savaPosition) {
      return savaPosition
    }
    return { x: 0, y: 0 }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('loginInfo') || sessionStorage.getItem('loginInfo')

  if (isLogin) {
    if (to.path.includes('auth')) {
      next('/')
    } else {
      next()
    }
  } else if (!isLogin) {
    if (to.path === '/') {
      next('/auth/login')
    } else if (to.path.includes('user')) {
      next('/auth')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
