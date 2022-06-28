<template>
  <v-container>
    <v-expansion-panels focusable>
      <v-expansion-panel
        v-for="data in hourlyData"
        :key="data.time"
      >
        <forecast-hourly-panel-header :forecast-data="data" />

        <forecast-hourly-panel-content :forecast-data="data" />
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { openWeatherMapIconMixin } from '@/mixins'
import ForecastHourlyPanelHeader from './ForecastHourlyPanelHeader.vue'
import ForecastHourlyPanelContent from './ForecastHourlyPanelContent.vue'

export default {
  name: 'ForecastHourlyPanel',
  components: { ForecastHourlyPanelHeader, ForecastHourlyPanelContent },
  mixins: [openWeatherMapIconMixin],
  props: {
    hourlyData: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
