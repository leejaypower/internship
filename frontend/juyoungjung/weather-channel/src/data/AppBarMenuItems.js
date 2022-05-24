const AppBarMenuItems = [
  {
    icon: 'mdi-view-dashboard',
    text: 'Dashboard',
    to: '/',
    requiredAuth: false,
  },
  {
    icon: 'mdi-calendar',
    text: '요일별 날씨 보기',
    to: '/detail-forecast/week-daily',
    requiredAuth: true,
  },
  {
    icon: 'mdi-hours-24',
    text: '시간별 날씨 보기',
    to: '/detail-forecast/today-hourly',
    requiredAuth: true,
  },
]
export default AppBarMenuItems
