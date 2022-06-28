<template>
  <v-sheet :class="responsiveSheetPaddingMixin">
    <v-skeleton-loader
      v-if="!forecastDaily7DaysList"
      type="image"
    />

    <forecast-daily-slide-card-group
      v-else
      :hash-key="hashKey"
      @onChangeHashKey="setHashKey"
    />

    <forecast-page-title
      :title="'요일별 날씨 현황'"
      :sub-title="'오늘로부터 7일간의 날씨 예보를 확인하실 수 있습니다.'"
    />

    <v-skeleton-loader
      v-if="!forecastDaily7DaysList"
      class="mt-6"
      type="image, image"
    />

    <v-card
      v-else
      class="mt-10"
    >
      <forecast-daily-weather-table :selected-day-data="selectedDayData" />
    </v-card>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
import { responsiveSheetMixin } from '@/mixins'
import dayjs from 'dayjs'
import { SHORT_DATE_ONLY_FORMAT } from '@/constants'
import ForecastDailySlideCardGroup from './components/ForecastDailySlideCardGroup.vue'
import ForecastDailyWeatherTable from './components/ForecastDailyWeatherTable.vue'
import ForecastPageTitle from '../components/ForecastPageTitle.vue'

export default {
  name: 'ForecastDaily',
  components: { ForecastDailySlideCardGroup, ForecastDailyWeatherTable, ForecastPageTitle },
  mixins: [responsiveSheetMixin],
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
    ...mapGetters('weather', ['currentCoords', 'forecastDaily7DaysList']),
  },
  watch: {
    hashKey(value) {
      if (this.forecastDaily7DaysList && value) {
        this.setSelectedDayData(this.forecastDaily7DaysList)
      }
    },
    forecastDaily7DaysList(value) {
      this.setSelectedDayData(value)
    },
  },
  mounted() {
    const routerHash = this.$route.hash.substring(1)
    const today = dayjs().format(SHORT_DATE_ONLY_FORMAT)

    if (!routerHash) {
      this.goToForecastDailyPageHash(today)
    } else {
      this.setHashKey(routerHash)
    }
  },
  methods: {
    setHashKey(key) {
      this.hashKey = key
    },
    goToForecastDailyPageHash(key) {
      if (key !== this.hashKey) {
        this.$router.push({ path: '/detail-forecast/daily', hash: key })
        this.setHashKey(key)
      }
    },
    setSelectedDayData(forecastDaily7DaysList) {
      const selectedData = forecastDaily7DaysList.filter((data) => data.key === this.hashKey)

      if (selectedData?.[0]) {
        const {
          feels_like: feelsLike, rain, humidity, uvi, wind, clouds,
        } = selectedData[0]

        this.selectedDayData = {
          feelsLike, rain, humidity, uvi, wind, clouds,
        }
      }
    },
  },
}
</script>
