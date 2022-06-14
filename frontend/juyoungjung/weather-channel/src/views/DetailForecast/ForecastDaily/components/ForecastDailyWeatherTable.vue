<template>
  <v-simple-table>
    <template #default>
      <tbody>
        <tr>
          <today-weather-table-td
            :content="selectedDayData.feelsLike"
            :icon="'mdi-thermometer-plus'"
            :label="'체감 온도'"
          />
          <today-weather-table-td
            :content="selectedDayData.rain || '0mm/h'"
            :icon="'mdi-water'"
            :label="'강수량'"
          />
        </tr>

        <tr>
          <today-weather-table-td
            :content="selectedDayData.humidity"
            :icon="'mdi-water-percent'"
            :label="'습도'"
          />
          <today-weather-table-td
            :content="selectedDayData.uvi"
            :icon="'mdi-water-percent'"
            :label="'자외선 지수'"
          />
        </tr>

        <tr>
          <today-weather-table-td
            :content="selectedDayData.wind"
            :icon="'mdi-send'"
            :label="'풍속'"
          />
          <today-weather-table-td
            :content="selectedDayData.clouds"
            :icon="'mdi-cloud-outline'"
            :label="'구름량'"
          />
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import { mapGetters } from 'vuex'
import TodayWeatherTableTd from '../../components/TodayWeatherTableTd.vue'

export default {
  name: 'ForecastDailyWeatherTable',
  components: {
    TodayWeatherTableTd,
  },
  props: {
    selectedDayData: {
      type: Object,
      default: () => ({
        feelsLike: '',
        rain: '',
        humidity: '',
        uvi: '',
        wind: '',
        clouds: '',
      }),
    },
  },
  computed: {
    ...mapGetters('weather', ['forecastDaily7DaysData']),
  },
}
</script>
