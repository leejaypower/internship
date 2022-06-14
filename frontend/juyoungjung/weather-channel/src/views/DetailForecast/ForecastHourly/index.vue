<template>
  <v-container>
    <forecast-page-title
      :title="'시간별 날씨 현황'"
      :sub-title="'현재 시간으로부터 48시간의 날씨 예보를 확인하실 수 있습니다.'"
      :forecast-data="forecastHourlyData"
    />

    <v-row>
      <v-col>
        <v-skeleton-loader
          v-if="!forecastHourlyData"
          class="mx-auto"
          type="image, image, image, image"
        />

        <forecast-hourly-panel
          v-else
          :hourly-data="forecastHourlyData"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ForecastPageTitle from '../components/ForecastPageTitle.vue'
import ForecastHourlyPanel from './components/ForecastHourlyPanel.vue'

export default {
  name: 'ForecastHourly',
  components: { ForecastHourlyPanel, ForecastPageTitle },
  computed: {
    ...mapGetters('weather', ['forecastHourlyData']),
  },
}
</script>
