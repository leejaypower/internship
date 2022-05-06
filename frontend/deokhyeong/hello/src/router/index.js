import Vue from 'vue'
import VueRouter from 'vue-router'
import MyHome from '../views/MyHome.vue'
import MyPage from '../views/MyPage.vue'
import MyCareer from '../views/MyCareer.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'my-home',
    component: MyHome,
  },
  {
    path: '/my-page',
    name: 'my-page',
    component: MyPage,
  },
  {
    path: '/my-career',
    name: 'my-career',
    component: MyCareer,
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
