<template>
  <div>
    <v-data-table
      disable-sort
      :headers="headers"
      :items="weatherItems"
      class="elevation-1"
      hide-default-footer
      disable-pagination
      mobile-breakpoint="0"
    >
      <template #[`item.weatherIcon`]="{item}">
        <img
          :src="item.weatherIcon"
          alt="날씨 아이콘"
          width="40"
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'WeatherTable',
  data() {
    return {
      headers: [
        {
          text: '시간', align: 'center', value: 'hour',
        },
        {
          text: '날씨', align: 'center', value: 'weatherIcon',
        },
        {
          text: '온도 (°C)', align: 'center', value: 'temperature',
        },
        {
          text: '강수량 (mm)', align: 'center', value: 'rain',
        },
        {
          text: '풍속 (m/s)', align: 'center', value: 'windSpeed',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('weather', ['hourlyWeathers']),
    weatherItems() {
      return this.hourlyWeathers.filter(
        (weather) => weather.date === this.$route.params.date,
      )
    },
  },
}
</script>
