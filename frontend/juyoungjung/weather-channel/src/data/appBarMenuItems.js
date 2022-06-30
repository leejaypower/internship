const appBarMenuItems = [
  {
    icon: 'mdi-view-dashboard',
    text: 'Dashboard',
    to: '/',
    requiredAuth: false,
  },
  {
    icon: 'mdi-calendar',
    text: '요일별 날씨 보기',
    to: '/detail-forecast/daily',
    requiredAuth: true,
  },
  {
    icon: 'mdi-hours-24',
    text: '시간별 날씨 보기',
    to: '/detail-forecast/hourly',
    requiredAuth: true,
  },
  {
    icon: 'mdi-chart-line',
    text: '전체 날씨 보기',
    to: '/detail-forecast/all',
    requiredAuth: true,
  },
  {
    icon: 'mdi-earth',
    text: '날씨 진단하기',
    to: '/detail-forecast/diagonose',
    requiredAuth: true,
  },
  {
    icon: 'mdi-alert-circle-check-outline',
    text: '에러 테스트하기',
    to: '/test-error',
    requiredAuth: false,
  },
]
export default appBarMenuItems
