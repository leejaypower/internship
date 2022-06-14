<template>
  <v-container>
    <v-row>
      <v-col>
        <v-skeleton-loader
          v-if="!forecastDaily7DaysData"
          type="image"
        />

        <forecast-daily-slide-card-group
          v-else
          :go-to-forecast-daily-page-hash="goToForecastDailyPageHash"
        />
      </v-col>
    </v-row>
    <forecast-page-title
      :title="'요일별 날씨 현황'"
      :sub-title="'오늘로부터 7일간의 날씨 예보를 확인하실 수 있습니다.'"
      :forecast-data="forecastDaily7DaysData"
    />

    <v-skeleton-loader
      v-if="!forecastDaily7DaysData"
      class="mt-6"
      type="image, image"
    />

    <v-row v-else>
      <v-col>
        <v-card

          class="mt-10"
        >
          <forecast-daily-weather-table :selected-day-data="selectedDayData" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import ForecastDailySlideCardGroup from './components/ForecastDailySlideCardGroup.vue'
import ForecastDailyWeatherTable from './components/ForecastDailyWeatherTable.vue'
import ForecastPageTitle from '../components/ForecastPageTitle.vue'

export default {
  name: 'ForecastDaily',
  components: { ForecastDailySlideCardGroup, ForecastDailyWeatherTable, ForecastPageTitle },
  data: () => ({
    selectedDayData: {
      feelsLike: '',
      rain: '',
      humidity: '',
      uvi: '',
      wind: '',
      clouds: '',
    },
    hashKey: '',
  }),
  computed: {
    ...mapGetters('weather', ['currentCoords', 'forecastDaily7DaysData']),
  },
  watch: {
    hashKey(value) {
      if (this.forecastDaily7DaysData && value) {
        this.setSelectedDayData(this.forecastDaily7DaysData)
      }
    },
    forecastDaily7DaysData(value) {
      this.setSelectedDayData(value)
    },
  },
  mounted() {
    const routerHash = this.$route.hash.substring(1)
    const today = dayjs().format('DD')

    if (!routerHash) {
      this.goToForecastDailyPageHash(today)
    } else {
      this.hashKey = routerHash
    }
  },
  methods: {
    goToForecastDailyPageHash(key) {
      if (key !== this.hashKey) {
        this.$router.push({ path: '/detail-forecast/daily', hash: key })
        this.hashKey = key
      }
    },
    setSelectedDayData(forecastDaily7DaysData) {
      const selectedData = forecastDaily7DaysData.filter((data) => data.key === this.hashKey)

      if (selectedData?.[0]) {
        const {
          feels_like: feelsLike, rain, humidity, uvi, wind, clouds,
        } = selectedData[0]

        this.selectedDayData.feelsLike = feelsLike
        this.selectedDayData.rain = rain
        this.selectedDayData.humidity = humidity
        this.selectedDayData.uvi = uvi
        this.selectedDayData.wind = wind
        this.selectedDayData.clouds = clouds
      }
    },
  },
}
</script>
