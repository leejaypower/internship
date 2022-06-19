<template>
  <v-app class="mx-auto overflow-hidden">
    <app-bar />
    <v-main class="mt-16 pa-10 d-flex justify-center">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { checkRefreshTokenMixin } from '@/mixins'
import AppBar from './components/AppBar.vue'
import { USER_INFO_LIST } from './constants'
import { setUserInfoListAtLocalStorage } from '../fakeServer'
import { makeApiResponseInfo } from './services'

export default {
  name: 'App',
  components: { AppBar },
  mixins: [checkRefreshTokenMixin],
  data: () => ({
    intervalGetOneCallApi: null,
  }),
  computed: {
    ...mapGetters('user', [
      'accessToken',
    ]),
    ...mapGetters('weather', [
      'currentCoords',
    ]),
  },
  created() {
    if (!localStorage.getItem(USER_INFO_LIST)) {
      setUserInfoListAtLocalStorage()
    }

    if (!this.accessToken && this.isRefreshTokenSavedAtLocalStorageMixin()) {
      this.$store.dispatch('user/renewalAccessTokenInfo')
    }

    if (!this.currentCoords && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.setCurrentPosition,
        this.positionError,
      )
    }

    const ONE_HOUR = 60 * 60 * 1000
    this.intervalGetOneCallApi = setInterval(() => {
      this.$store.dispatch('weather/setCurrentCoords', this.currentCoords)
    }, ONE_HOUR)
  },
  destroyed() {
    clearInterval(this.intervalGetOneCallApi)
  },
  methods: {
    async setCurrentPosition(position) {
      const { longitude, latitude } = position.coords

      await this.$store.dispatch('weather/setCurrentCoords', { longitude, latitude })
      await this.$store.dispatch('weather/getLocationName', { longitude, latitude })
      await this.$store.dispatch('weather/getOneCallApi', { longitude, latitude })
    },
    positionError(error) {
      const info = makeApiResponseInfo(
        'error',
        '현재 위치를 가져오는데 실패했습니다. 페이지 새로고침 시에도 같은 문제가 발생할 경우 관리자에게 문의해주세요.',
        error.message,
      )

      this.$store.dispatch('weather/setApiResponseInfo', info)
    },
  },
}
</script>
