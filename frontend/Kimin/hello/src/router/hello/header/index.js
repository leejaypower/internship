import Homeview from '../../../views/Home.vue'
import SecondMenu from '../../../components/layout/SecondMenu.vue'
import { personalContents, companyContents } from '../contents/index'

const header = [
  {
    path: '',
    name: 'HomeView',
    component: Homeview,
  },
  {
    path: '/Barogo',
    name: 'SecondMenu',
    component: SecondMenu,
    children: companyContents,
  },
  {
    path: '/Kimin',
    name: 'SecondMenu',
    component: SecondMenu,
    children: personalContents,
  },
]

export default header
