import FamilyView from '../../../views/personalIntro/Family.vue'
import TasteView from '../../../views/personalIntro/Taste.vue'
import HistoryView from '../../../views/companyIntro/History.vue'
import CEOView from '../../../views/companyIntro/CEO.vue'
import MarketView from '../../../views/companyIntro/Market.vue'
import CompanyView from '../../../views/companyIntro/Company.vue'
import KiminView from '../../../views/personalIntro/Kimin.vue'

const personalContents = [
  {
    path: '',
    name: 'KiminHome',
    component: KiminView,
  },
  {
    path: 'Family',
    name: 'Family',
    component: FamilyView,
  },
  {
    path: 'Taste',
    name: 'Taste',
    component: TasteView,
  },
]

const companyContents = [
  {
    path: '',
    name: 'CompanyHome',
    component: CompanyView,
  },
  {
    path: 'Market',
    name: 'Market',
    component: MarketView,
  },
  {
    path: 'CEO',
    name: 'CEO',
    component: CEOView,
  },
  {
    path: 'History',
    name: 'History',
    component: HistoryView,
  },
]

export { personalContents, companyContents }
