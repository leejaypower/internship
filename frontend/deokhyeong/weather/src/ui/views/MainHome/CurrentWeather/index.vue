<template>
  <div class="d-flex flex-column justify-center align-center full-height pb-8">
    <span class="text-h4 font-weight-medium text-center">
      {{ weatherSimpleNote }}
    </span>
    <div>
      <img
        alt="날씨 아이콘"
        :src="weatherIcon"
        height="160"
      >
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
      <v-btn @click="$emit('moveToWeatherDetail')">
        날씨 자세히 보기
      </v-btn>
    </div>
  </div>
</template>
<script>
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
      return this.currentWeather?.weatherSimpleNote || '-'
    },
    weatherIcon() {
      return this.currentWeather?.weatherIcon || 'images/no-result.png'
    },
    temperature() {
      return this.currentWeather?.temperature || '-'
    },
    minTemperature() {
      return this.currentWeather?.minTemperature || '-'
    },
    maxTemperature() {
      return this.currentWeather?.maxTemperature || '-'
    },
    airQuality() {
      return this.currentAirPollution?.airQuality || '-'
    },
  },
}
</script>
