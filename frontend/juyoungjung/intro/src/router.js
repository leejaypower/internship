import Vue from 'vue'
import VueRouter from 'vue-router'
import SelfIntro from '@/components/SelfIntro/Index.vue'
import BarogoIntro from '@/components/BarogoIntro/Index.vue'
import App from './App.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
      }
    }
    return { x: 0, y: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      redirect: { name: 'SelfIntro' },
      name: 'IntroPages',
      component: App,
      children: [
        {
          name: 'SelfIntro',
          path: '/SelfIntro',
          component: SelfIntro,
        },
        {
          name: 'BarogoIntro',
          path: '/BarogoIntro',
          component: BarogoIntro,
        },
      ],
    },
  ],
})

export default router
