<template>
  <div>
    <v-skeleton-loader
      v-if="!currentMonthClimateAverageValue"
      class="mx-auto"
      type="image, image"
    />

    <template v-else>
      <div class="px-3 pb-16">
        <weather-progress-linear
          :weather-data="currentTemperatureValue"
          :title="'현재기온'"
          :color="'amber'"
          :unit="CELSIUS_UNIT"
        />

        <h2 class="mt-8 mb-2 mx-2">
          {{ currentMonthClimateAverageValue.currentMonth }}월 기후평년값
        </h2>

        <weather-progress-linear
          :weather-data="averageTemperatureValue"
          :title="'평균기온'"
          :color="'lime'"
          :unit="CELSIUS_UNIT"
        />

        <weather-progress-linear
          :weather-data="maxAverageTemperatureValue"
          :title="'최고기온'"
          :color="'red'"
          :unit="CELSIUS_UNIT"
        />

        <weather-progress-linear
          :weather-data="minAverageTemperatureValue"
          :title="'최저기온'"
          :color="'cyan'"
          :unit="CELSIUS_UNIT"
        />
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { CELSIUS_UNIT } from '@/constants'
import WeatherProgressLinear from './WeatherProgressLinear.vue'

export default
{
  name: 'CompareCurrentWeatherWithClimateAverage',
  components: { WeatherProgressLinear },
  props: {
    setImageVisible: {
      type: Function,
      default: () => {},
    },
    currentMonthClimateAverageValue: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      currentTemperatureValue: 0,
      averageTemperatureValue: 0,
      maxAverageTemperatureValue: 0,
      minAverageTemperatureValue: 0,
      intervalCurrentTemperature: 0,
      intervalAverageTemperature: 0,
      CELSIUS_UNIT,
    }
  },
  computed: {
    ...mapGetters('weather', [
      'simpleCurrentWeatherData',
    ]),
  },
  watch: {
    simpleCurrentWeatherData(value) {
      if (value) {
        this.autoPlusCurrentTemperatureValue()
        this.autoPlusAverageTemperatureValue()
      }
    },
  },
  mounted() {
    if (this.simpleCurrentWeatherData) {
      this.autoPlusCurrentTemperatureValue()
      this.autoPlusAverageTemperatureValue()
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalCurrentTemperature)
    clearInterval(this.intervalAverageTemperature)
  },
  methods: {
    autoPlusCurrentTemperatureValue() {
      const currentTemperature = Number(this.simpleCurrentWeatherData.temp.replace(CELSIUS_UNIT, ''))

      if (this.currentTemperatureValue > currentTemperature) {
        this.currentTemperatureValue = currentTemperature
        this.maxAverageTemperatureValue = this.currentMonthClimateAverageValue.temp.max
        this.minAverageTemperatureValue = this.currentMonthClimateAverageValue.temp.min
        this.setImageVisible()

        return clearInterval(this.intervalCurrentTemperature)
      }

      setTimeout(() => {
        this.intervalCurrentTemperature = setTimeout(() => {
          this.currentTemperatureValue += 1
          return setTimeout(this.autoPlusCurrentTemperatureValue, 30)
        }, 30)
      }, 30)

      return null
    },
    autoPlusAverageTemperatureValue() {
      const averageTemperature = this.currentMonthClimateAverageValue.temp.average

      if (this.averageTemperatureValue > averageTemperature) {
        this.averageTemperatureValue = averageTemperature

        return clearInterval(this.intervalAverageTemperature)
      }

      setTimeout(() => {
        this.intervalAverageTemperature = setTimeout(() => {
          this.averageTemperatureValue += 1
          return setTimeout(this.autoPlusAverageTemperatureValue, 30)
        }, 30)
      }, 30)

      return null
    },
  },
}
</script>
