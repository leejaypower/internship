import Vue from 'vue'
import VueRouter from 'vue-router'
import IntroView from '../views/IntroView.vue'
import MeIntro from '../views/MeIntro.vue'
import CompanyIntro from '../views/CompanyIntro.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/intro',
    name: 'intro',
    redirect: { name: 'me' },
    component: IntroView,
    children: [
      {
        path: 'me',
        name: 'me',
        component: MeIntro,
      },
      {
        path: 'company',
        name: 'company',
        component: CompanyIntro,
      },
    ],
  },
  {
    path: '/*',
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

export default router
