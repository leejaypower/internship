import Vue from 'vue'
import VueRouter from 'vue-router'
import { AuthHub, LoginView } from '@/views/auth'

Vue.use(VueRouter)

const routes = [
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
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
