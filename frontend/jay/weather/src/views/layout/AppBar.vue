<template>
  <v-app-bar
    app
    color="white"
    flat
  >
    <v-avatar
      :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
      size="32"
    />

    <v-tabs
      centered
      class="ml-n9"
      color="grey darken-1"
    >
      <v-tab
        v-for="link in links"
        :key="link.name"
        :to="{ path: link.path }"
        @click="checkAuth(link.path)"
      >
        {{ link.name }}
      </v-tab>
    </v-tabs>

    <v-avatar
      class="hidden-sm-and-down"
      color="grey darken-1 shrink"
      size="32"
    />
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        name: '오늘 여기 날씨',
        path: '/here-weather',
      },
      {
        name: '여기 주간 예보',
        path: '/here-weekly-weather',
      },
      {
        name: '다른 지역 날씨',
        path: '/other-regions-weather',
      },
    ],
  }),
  methods: {
    checkAuth(path) {
      if (path !== '/here-weather' && !this.$store.getters['userStore/isLogin']) {
        this.$store.dispatch('alertStore/setAlertInfo', {
          type: 'warning',
          message: '로그인 후 이용가능합니다.',
        })
        return
      }
      if (path !== '/here-weather' && this.$store.getters['userStore/isLogin']) {
        const today = new Date()
        const now = today.getMonth() + 1
        const rightNow = today.getTime()
        const storeToken = this.$store.getters['authStore/token']

        if (storeToken.exp < 13 && storeToken.exp < now) {
          // jwt token으로 로그인 되어있을 경우(관리자 로그인) 토큰 유효기간이 월 단위입니다.
          this.$store.dispatch('userStore/clearUserInfo')
          this.$store.dispatch('alertStore/setAlertInfo', {
            type: 'warning',
            message: '재로그인이 필요합니다.',
          })
          localStorage.removeItem('access-token')
          localStorage.removeItem('refresh-token')
          localStorage.removeItem('testRefreshToken')
          localStorage.removeItem('testAccessToken')
        }
        if (storeToken.exp > 13 && storeToken.exp < rightNow) {
          // fake token으로 로그인 되어있을 경우 유효기간은 초 단위입니다.
          this.$store.dispatch('userStore/clearUserInfo')
          this.$store.dispatch('alertStore/setAlertInfo', {
            type: 'warning',
            message: '재로그인이 필요합니다.',
          })
          localStorage.removeItem('access-token')
          localStorage.removeItem('refresh-token')
          localStorage.removeItem('testRefreshToken')
          localStorage.removeItem('testAccessToken')
        }
      }
    },
  },
}
</script>

<style scoped>

</style>
