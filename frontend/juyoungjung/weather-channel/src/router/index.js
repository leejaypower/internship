import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DashBoard',
    component: () => import('@/views/DashBoard.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
  },
  {
    path: '/update-my-info',
    name: 'UpdateMyInfo',
    component: () => import('@/views/UpdateMyInfo.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/detail-forecast',
    name: 'DetailForecast',
    component: () => import('@/views/Weather/DetailForecast.vue'),
    children: [
      {
        path: 'today-hourly',
        name: 'TodayHourly',
        component: () => import('@/views/Weather/TodayHourly.vue'),
        meta: { authRequired: true },
      },
      {
        path: 'week-daily',
        name: 'WeekDaily',
        component: () => import('@/views/Weather/WeekDaily.vue'),
        meta: { authRequired: true },
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired && !localStorage.getItem('email')) {
    store.dispatch('user/setLoginFormModalVisible', {
      visible: true,
    })
    next('/')
    return
  }
  next()
})

export default router
