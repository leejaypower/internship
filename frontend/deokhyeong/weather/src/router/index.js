import Vue from 'vue'
import VueRouter from 'vue-router'
import MainHome from '@/ui/views/MainHome.vue'
import SignUp from '@/ui/views/SignUp.vue'
import SignIn from '@/ui/views/SignIn.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainHome',
    component: MainHome,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
