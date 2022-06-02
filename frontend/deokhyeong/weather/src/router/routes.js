/* eslint-disable import/extensions */
import MainHome from '@/ui/views/MainHome'
import SignUp from '@/ui/views/SignUp'
import SignIn from '@/ui/views/SignIn'

export default [
  {
    path: '/',
    name: 'MainHome',
    component: MainHome,
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
]
