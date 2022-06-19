<template>
  <div class="mx-16">
    <div class="my-3">
      <h2 class="text-end">
        {{ today }}
      </h2>
    </div>

    <forecast-page-title
      :title="'전체 날씨 현황'"
      :sub-title="'현재 지역 또는 다른 지역의 요일별/시간별 날씨 예보를 확인하실 수 있습니다.'"
    />

    <v-sheet :height="responsiveSheetHeight">
      <div class="align-center fill-height my-16">
        <forecast-daily-tab-items />
      </div>
    </v-sheet>

    <v-sheet :height="responsiveSheetHeight">
      <div class="align-center fill-height my-16">
        <forecast-hourly-tab-items />
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import {
  PC_HEIGHT,
  MOBILE_HEIGHT,
} from '@/constants'
import ForecastPageTitle from '../components/ForecastPageTitle.vue'
import ForecastDailyTabItems from './components/ForecastDailyTabItems.vue'
import ForecastHourlyTabItems from './components/ForecastHourlyTabItems.vue'

export default {
  name: 'ForecastAll',
  components: {
    ForecastPageTitle, ForecastDailyTabItems, ForecastHourlyTabItems,
  },
  computed: {
    ...mapGetters('weather', [
      'forecastHourlyTemperatureList',
    ]),
    today() {
      return dayjs().format('YYYY.MM.DD(dddd)')
    },
    responsiveSheetHeight() {
      return this.$vuetify.breakpoint.mdAndDown ? MOBILE_HEIGHT : PC_HEIGHT
    },
  },
}
</script>
