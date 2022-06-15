import Vue from 'vue'
import VueRouter from 'vue-router'
import { AuthHub, LoginView, SignupView } from '@/views/auth'
import { CurrentLocation, WeatherHub, LocationView } from '@/views/weather'
import { BookmarkView, MyPageHub, UserInfo } from '@/views/mypage'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'weather' },
  },
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
      {
        path: 'location',
        name: 'location',
        component: LocationView,
      },
    ],
  },
  {
    path: '/mypage',
    name: 'mypage',
    redirect: { name: 'bookmark' },
    component: MyPageHub,
    children: [
      {
        path: 'bookmark',
        name: 'bookmark',
        component: BookmarkView,
      },
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
  {
    path: '*',
    name: 'notfound',
    component: NotFound,
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
  const hasEnteredAuthPageAfterLogin = isLogin && to.path.includes('auth')
  const hasEnteredMyPageWithoutLogin = !isLogin && to.path.includes('mypage')
  if (hasEnteredAuthPageAfterLogin) {
    next('/')
  }
  if (hasEnteredMyPageWithoutLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
