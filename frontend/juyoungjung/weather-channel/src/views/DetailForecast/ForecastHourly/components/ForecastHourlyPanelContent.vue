<template>
  <v-expansion-panel-content>
    <v-card class="mt-10">
      <v-simple-table>
        <template #default>
          <tbody>
            <tr>
              <today-weather-table-td
                :content="forecastData.feels_like"
                :icon="'mdi-thermometer-plus'"
                :label="'체감 온도'"
              />
              <today-weather-table-td
                :content="forecastData.rain || '0mm/h'"
                :icon="'mdi-water'"
                :label="'강수량'"
              />
            </tr>

            <tr>
              <today-weather-table-td
                :content="forecastData.humidity"
                :icon="'mdi-water-percent'"
                :label="'습도'"
              />
              <today-weather-table-td
                :content="forecastData.uvi"
                :icon="'mdi-water-percent'"
                :label="'자외선 지수'"
              />
            </tr>

            <tr>
              <today-weather-table-td
                :content="forecastData.wind"
                :icon="'mdi-send'"
                :label="'풍속'"
              />
              <today-weather-table-td
                :content="forecastData.clouds"
                :icon="'mdi-cloud-outline'"
                :label="'구름량'"
              />
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
import { openWeatherMapIconMixin } from '@/mixins'
import TodayWeatherTableTd from '../../components/TodayWeatherTableTd.vue'

export default {
  name: 'ForecastHourlyPanelContent',
  components: { TodayWeatherTableTd },
  mixins: [openWeatherMapIconMixin],
  props: {
    forecastData: {
      type: Object,
      default: null,
    },
  },
}
</script>
