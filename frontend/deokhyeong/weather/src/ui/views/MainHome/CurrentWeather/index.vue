<template>
  <div class="d-flex flex-column justify-center align-center full-height pb-8">
    <span class="text-h4 font-weight-medium text-center">
      {{ weatherSimpleNote }}
    </span>
    <div>
      <img
        v-if="weatherIcon"
        alt="날씨 아이콘"
        :src="weatherIcon"
        height="160"
      >
      <span
        v-else
      >
        아이콘 정보 없음
      </span>
    </div>
    <div class="text-h4 font-weight-bold">
      {{ temperature }}&deg;C
    </div>
    <div class="subtitle-1 font-weight-bold pb-4">
      <span>최저 : {{ minTemperature }}&deg;C</span>
      <span> / </span>
      <span>최고 : {{ maxTemperature }}&deg;C</span>
    </div>
    <div class="text-h5 font-weight-bold pb-4">
      <span>미세 먼지</span>
      <span> : </span>
      <span>{{ airQuality }}</span>
    </div>
    <div>
      <v-btn @click="moveToWeatherDetail">
        날씨 자세히 보기
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'CurrentWeather',
  props: {
    currentWeather: {
      type: Object,
      default: () => ({}),
    },
    currentAirPollution: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    weatherSimpleNote() {
      return this.currentWeather?.weatherSimpleNote ? this.currentWeather?.weatherSimpleNote : '-'
    },
    weatherIcon() {
      return this.currentWeather?.weatherIcon
    },
    temperature() {
      return this.currentWeather?.temperature ? this.currentWeather?.temperature : '-'
    },
    minTemperature() {
      return this.currentWeather?.minTemperature ? this.currentWeather?.minTemperature : '-'
    },
    maxTemperature() {
      return this.currentWeather?.maxTemperature ? this.currentWeather?.maxTemperature : '-'
    },
    airQuality() {
      return this.currentAirPollution?.airQuality ? this.currentAirPollution?.airQuality : '-'
    },
  },
  methods: {
    ...mapActions('alert', ['alertOpen']),
    moveToWeatherDetail() {
      // 추후에 주간 날씨 정보 완성되면 그 페이지로 이동하는거로 구현하겠습니다.
      this.alertOpen(
        { message: '아직 준비가 진행중입니다. 🚅' },
      )
    },
  },
}
</script>
