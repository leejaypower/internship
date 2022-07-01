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
import { geolocationPositionErrorHandler, translateNavigatorGeolocationErrorCode } from './services/errorHandler'

export default {
  name: 'App',
  components: { AppBar },
  mixins: [checkRefreshTokenMixin],
  data: () => ({
    intervalGetOneCallApi: null,
  }),
  computed: {
    ...mapGetters('user', [
      'accessToken', 'myInfo',
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
      let userInfo = null

      if (this.myInfo) {
        const { email, nickname } = this.myInfo

        userInfo = {
          email, nickname,
        }
      }

      geolocationPositionErrorHandler(error, userInfo)

      const info = makeApiResponseInfo(
        'error',
        '현재 위치를 가져오는데 실패했습니다.',
        translateNavigatorGeolocationErrorCode(error.code),
      )

      this.$store.dispatch('alert/setWeatherApiResponse', info)
    },
  },
}
</script>
