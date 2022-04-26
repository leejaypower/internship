import Vue from 'vue'
import VueRouter from 'vue-router'
import createView from '../views/CreateView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'All',
    component: createView('All'),
  },
  {
    path: '/Barogo',
    name: 'Barogo',
    component: createView('Barogo'),
  },
  {
    path: '/etc',
    name: 'etc',
    component: createView('etc'),
  },
  {
    path: '/Home',
    name: 'Home',
    component: createView('Home'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
