<template>
  <v-container>
    <CurrentWeather
      :loading="loading"
      :current-data="currentDatas"
      :on-re-fetch="getCurrentInfo"
    />
    <HourWeather
      :loading="loading"
      :hourly-datas="currentHourlyDatas"
    />
    <DailyWeather
      :loading="loading"
      :daily-datas="currentDailyDatas"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { CurrentWeather, DailyWeather, HourWeather } from '@/components/weather'

export default {
  components: {
    CurrentWeather,
    HourWeather,
    DailyWeather,
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters('weather', ['isWeatherFetchResult', 'currentDatas', 'currentDailyDatas', 'currentHourlyDatas']),
  },
  async created() {
    if (!this.isWeatherFetchResult) {
      this.getCurrentInfo()
    }
  },
  methods: {
    ...mapActions('weather', ['currentLocationUpdate', 'defaultLocationUpdate']),
    async defaultFetch() {
      await this.defaultLocationUpdate()
    },
    async getCurrentInfo() {
      this.loading = true
      await this.currentLocationUpdate()
      this.loading = false
    },
  },
}
</script>
