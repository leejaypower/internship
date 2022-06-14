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
import { USERINFOLIST } from './constants/localStorage-types'
import { setUserInfoListAtLocalStorage } from '../fakeServer'

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
    if (!localStorage.getItem(USERINFOLIST)) {
      setUserInfoListAtLocalStorage()
    }

    if (!this.accessToken && this.$_isRefreshTokenSavedAtLocalStorage()) {
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
      const info = {
        desc: '현재 위치 이름을 가져오는데 실패했습니다.', message: error.message,
      }

      this.$store.dispatch('weather/setResponseErrorInfo', info)
    },
  },
}
</script>
