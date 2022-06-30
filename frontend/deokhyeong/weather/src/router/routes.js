import MainHome from '@/ui/views/MainHome'
import SignUp from '@/ui/views/SignUp'
import SignIn from '@/ui/views/SignIn'
import MyPage from '@/ui/views/MyPage'
import LocationAdd from '@/ui/views/LocationAdd'
import ForecastDetail from '@/ui/views/ForecastDetail'
import WeatherTable from '@/ui/views/ForecastDetail/WeatherTable'
import WeatherGraph from '@/ui/views/ForecastDetail/WeatherGraph'
import dayjs from 'dayjs'
import OneWeekForecast from '@/ui/views/OneWeekForecast'
import ErrorTest from '@/ui/views/ErrorTest'
import NotFound from '@/ui/views/NotFound'

export default [
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'MainHome',
    component: MainHome,
    meta: { requiresAuth: true },
  },
  {
    path: '/my-page',
    name: 'MyPage',
    component: MyPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/location-add',
    name: 'LocationAdd',
    component: LocationAdd,
    meta: { requiresAuth: true },
  },
  {
    path: '/one-week-forecast',
    name: 'OneWeekForecast',
    component: OneWeekForecast,
    meta: { requiresAuth: true },
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta: { noRequiresAuth: true },
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    meta: { noRequiresAuth: true },
  },
  {
    path: '/error-test',
    name: 'ErrorTest',
    component: ErrorTest,
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      if (process.env.NODE_ENV === 'production') {
        next('/')
      } else {
        next()
      }
    },
  },
  {
    path: '/forecast-detail',
    name: 'ForecastDetail',
    component: ForecastDetail,
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      const currentDate = dayjs().format('YYYY-MM-DD')
      const paramsDate = dayjs(to.params.date)
      const isInValidDate = !dayjs(to.params.date).isValid()
      const isOverOneDays = paramsDate.diff(currentDate, 'day') > 1
      const isPastDay = paramsDate.diff(currentDate, 'day') < 0

      if (to.path === '/forecast-detail' || isInValidDate || isOverOneDays || isPastDay) {
        next('/seven-forecast')
      } else {
        next()
      }
    },
    children: [
      {
        path: 'table/:date',
        component: WeatherTable,
        meta: { requiresAuth: true },
      },
      {
        path: 'graph/:date',
        component: WeatherGraph,
        meta: { requiresAuth: true },
      },
    ],
  },
]
