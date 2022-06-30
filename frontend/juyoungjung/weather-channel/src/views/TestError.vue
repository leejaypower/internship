<template>
  <div class="d-flex flex-column justify-center align-center">
    <weather-api-response-alert />
    <user-api-response-alert />

    <h1>에러 테스트하기</h1>
    <v-btn
      class="my-2"
      x-large
      @click="makeReferenceError()"
    >
      Reference Error 만들기
    </v-btn>
    <v-btn
      class="my-2"
      x-large
      @click="makeFakeAxiosError()"
    >
      FakeAxios Error 만들기
    </v-btn>
    <v-btn
      class="my-2"
      x-large
      @click="makeNaverReverseGeocodingApiError()"
    >
      Naver Reverse Geocoding API Error 만들기
    </v-btn>
    <v-btn
      class="my-2"
      x-large
      @click="makeOpenweatherApiError()"
    >
      Openweather API Error 만들기
    </v-btn>
    <v-btn
      class="my-2"
      x-large
      @click="makeBrowserError()"
    >
      Browser Error 만들기
    </v-btn>
  </div>
</template>
<script>
import { userApi, naverOpenApi, openWeatherApi } from '@/api'
import {
  fakeAxiosErrorHandler,
  naverGeocodingApiErrorHandler,
  openWeatherMapApiErrorHandler,
  translateFakeAxiosResponseErrorCode,
} from '@/services/errorHandler'
import WeatherApiResponseAlert from '@/components/WeatherApiResponseAlert.vue'
import UserApiResponseAlert from '@/components/UserApiResponseAlert.vue'
import { makeApiResponseInfo } from '@/services'

export default {
  name: 'TestError',
  components: { WeatherApiResponseAlert, UserApiResponseAlert },
  data: () => ({
    badRequestParams: { longitude: 'make', latitude: 'error' },
    userInfo: {
      email: 'test@test.com',
      nickname: 'test',
    },
  }),
  methods: {
    makeReferenceError() {
      // eslint-disable-next-line no-undef
      return x
    },
    async makeFakeAxiosError() {
      try {
        await userApi.patchUpdateNickname({
          email: 'make',
          oldNickname: 'error',
          newNickname: 'error',
        })
      } catch (error) {
        fakeAxiosErrorHandler(error, this.userInfo)

        const info = makeApiResponseInfo(
          'error',
          translateFakeAxiosResponseErrorCode('Gateway error'),
        )

        this.$store.dispatch('alert/setUserApiResponse', info, { root: true })
      }
    },
    async makeNaverReverseGeocodingApiError() {
      try {
        await naverOpenApi.getLocationNameByCoords(this.badRequestParams)
      } catch (error) {
        const info = makeApiResponseInfo(
          'error',
          '현재 위치의 행정동 이름을 가져오는 도중 문제가 발생했습니다. 관리자에게 문의해주세요.',
          error.code,
        )

        this.$store.dispatch('alert/setWeatherApiResponse', info, { root: true })

        naverGeocodingApiErrorHandler(error, this.userInfo)
      }
    },
    async makeOpenweatherApiError() {
      try {
        await openWeatherApi.fetchOneCallApi(this.badRequestParams, this.userInfo)
      } catch (error) {
        const info = makeApiResponseInfo(
          'error',
          '일일 예보 데이터를 가져오는 도중 문제가 발생했습니다. 최신 날씨 현황 가져오기를 위한 새로고침 버튼 클릭 시에도 동일한 문제가 발생할 경우 관리자에게 문의해주세요.',
          error.code,
        )

        this.$store.dispatch('alert/setWeatherApiResponse', info, { root: true })

        openWeatherMapApiErrorHandler(error)
      }
    },
    makeBrowserError() {
      function rejectPromise() {
        return Promise.reject(new Error('rejected promise'))
      }

      async function throwAsync() {
        throw new Error('async exception')
      }

      function fail() {
        throw new Error('exception')
      }

      rejectPromise().then(() => console.log('success'))
      throwAsync()
      fail()
    },
  },
}
</script>
