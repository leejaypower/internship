<template>
  <v-container>
    <CurrentWeather
      :loading="loading"
      :current-data="currentData"
      :on-re-fetch="getCurrentInfo"
      :title="currentName"
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
    ...mapGetters('weather', ['isWeatherFetchResult', 'currentName', 'currentData', 'currentDailyDatas', 'currentHourlyDatas']),
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
