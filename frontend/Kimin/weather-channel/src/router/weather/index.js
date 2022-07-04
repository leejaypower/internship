const weather = [
  {
    path: '/',
    name: 'SignInPage',
    component: () => import('@/views/signInPage/SignInPage.vue'),
  },
  {
    path: '/Home',
    component: () => import('@/views/servicePage/layouts/AppHome.vue'),
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: '',
        name: 'HomeDefault',
        meta: {
          authRequired: true,
        },
        component: () => import('@/views/servicePage/AppDashboard.vue'),
      },
      {
        path: 'Dashboard',
        name: 'AppDashboard',
        meta: {
          authRequired: true,
        },
        component: () => import('@/views/servicePage/AppDashboard.vue'),
      },
      {
        path: 'MyInfo',
        name: 'MyInfo',
        meta: {
          authRequired: true,
        },
        component: () => import('@/views/servicePage/MyInfo.vue'),
      },
      {
        path: 'Search',
        name: 'AppSearch',
        meta: {
          authRequired: true,
        },
        component: () => import('@/views/servicePage/AppSearch.vue'),
      },
      {
        path: 'TestLogging',
        name: 'TestLogging',
        meta: {
          authRequired: true,
        },
        component: () => import('@/views/servicePage/TestLogging.vue'),
      },
    ],
  },
]

export default weather
