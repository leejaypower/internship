<template>
  <v-sheet :class="responsiveSheetPaddingMixin">
    <div class="my-3">
      <h2 class="text-end">
        {{ today }}
      </h2>
    </div>

    <div class="mb-16">
      <forecast-page-title
        :title="'전체 날씨 현황'"
        :sub-title="'현재 지역 또는 다른 지역의 요일별/시간별 날씨 예보를 확인하실 수 있습니다.'"
      />
    </div>

    <v-sheet
      :height="responsiveSheetHeight"
    >
      <forecast-daily-tab-items />
    </v-sheet>

    <v-sheet
      :height="responsiveSheetHeight"
    >
      <forecast-hourly-tab-items />
    </v-sheet>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import {
  FORECAST_ALL_PC_SHEET_HEIGHT,
  FORECAST_ALL_MOBILE_SHEET_HEIGHT,
  FULL_DATE_WITH_DAY_FORMAT,
} from '@/constants'
import { responsiveSheetMixin } from '@/mixins'
import ForecastPageTitle from '../components/ForecastPageTitle.vue'
import ForecastDailyTabItems from './components/ForecastDailyTabItems.vue'
import ForecastHourlyTabItems from './components/ForecastHourlyTabItems.vue'

export default {
  name: 'ForecastAll',
  components: {
    ForecastPageTitle, ForecastDailyTabItems, ForecastHourlyTabItems,
  },
  mixins: [responsiveSheetMixin],
  computed: {
    ...mapGetters('weather', [
      'forecastHourlyTemperatureList',
    ]),
    today() {
      return dayjs().format(FULL_DATE_WITH_DAY_FORMAT)
    },
    responsiveSheetHeight() {
      return this.$vuetify.breakpoint.mdAndDown
        ? FORECAST_ALL_MOBILE_SHEET_HEIGHT : FORECAST_ALL_PC_SHEET_HEIGHT
    },
  },
}
</script>
