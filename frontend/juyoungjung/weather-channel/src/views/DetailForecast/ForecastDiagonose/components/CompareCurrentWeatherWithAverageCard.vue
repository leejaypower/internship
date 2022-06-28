<template>
  <v-lazy
    :options="{
      threshold: .9
    }"
    transition="scale-transition"
  >
    <v-card
      class="px-16 py-2"
      height="320"
    >
      <weather-progress-linear
        :weather-data="info.current"
        :title="info.title[0]"
        :color="info.color[0]"
        :unit="info.unit"
      />

      <h2 class="mt-6 mb-2 mx-2 text-start">
        {{ currentMonth }}월 기후평년값
      </h2>

      <weather-progress-linear
        :weather-data="info.average"
        :title="info.title[1]"
        :color="info.color[1]"
        :unit="info.unit"
      />

      <weather-progress-linear
        v-if="!!info.totalRainValue"
        :weather-data="info.totalRainValue"
        :title="`총강수량`"
        :color="'cyan lighten-5'"
        :unit="'mm'"
      />
    </v-card>
  </v-lazy>
</template>
<script>
import dayjs from 'dayjs'
import WeatherProgressLinear from './WeatherProgressLinear.vue'

export default
{
  name: 'CompareCurrentWeatherWithAverageCard',
  components: { WeatherProgressLinear },
  props: {
    info: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    currentMonth: dayjs().month() + 1,
  }),
}
</script>
