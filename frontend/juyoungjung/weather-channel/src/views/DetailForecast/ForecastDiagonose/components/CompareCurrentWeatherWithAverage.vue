<template>
  <div>
    <v-skeleton-loader
      v-if="!progressLinearInfoList"
      class="mx-auto mt-10"
      type="image, image, image"
    />

    <template v-else>
      <k-m-a-main-page-card-vue />

      <v-row>
        <v-col
          v-for="info in progressLinearInfoList"
          :key="info.key"
          cols="12"
          md="6"
        >
          <compare-current-weather-with-average-card
            :info="info"
          />
        </v-col>
      </v-row>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import KMAMainPageCardVue from './KMAMainPageCard.vue'
import CompareCurrentWeatherWithAverageCard from './CompareCurrentWeatherWithAverageCard.vue'

export default
{
  name: 'CompareCurrentWeatherWithAverage',
  components: { KMAMainPageCardVue, CompareCurrentWeatherWithAverageCard },
  props: {
    currentMonthClimateAverageValue: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    progressLinearInfoList: null,
  }),
  computed: {
    ...mapGetters('weather', [
      'simpleCurrentWeatherData',
    ]),
  },
  watch: {
    simpleCurrentWeatherData(value) {
      if (value) {
        this.makeProgressLinearInfoList(value)
      }
    },
  },
  mounted() {
    if (this.simpleCurrentWeatherData) {
      this.makeProgressLinearInfoList(this.simpleCurrentWeatherData)
    }
  },
  methods: {
    makeProgressLinearInfoList(current) {
      let currentRain = 0

      if (current.rain) {
        currentRain = Number(current.rain.replace('mm/h', ''))
      }

      const currentWindSpeed = Number(current.wind_speed.replace('m/s', ''))
      const average = this.currentMonthClimateAverageValue
      const totalRainValue = Number(average.rain.total)
      const currentMonthTotalDays = dayjs().daysInMonth()

      this.progressLinearInfoList = [
        {
          key: 'progressLinearInfo-1',
          current: currentWindSpeed,
          average: average.wind_speed,
          title: ['현재풍속', '평균풍속'],
          color: ['green', 'light-blue'],
          unit: 'm/s',
          totalRainValue: 0,
        },
        {
          key: 'progressLinearInfo-2',
          current: currentRain,
          average: average.rain.average,
          title: ['현재강수량', `총강수량/${currentMonthTotalDays}일`],
          color: ['orange', 'teal'],
          unit: 'mm',
          totalRainValue,
        },
      ]
    },
  },
}
</script>
