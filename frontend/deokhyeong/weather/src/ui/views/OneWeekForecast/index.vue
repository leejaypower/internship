<template>
  <div
    class="d-flex flex-column full-height"
    :style="backgroundImageStyle"
  >
    <circular-loading v-if="isLoading" />
    <div
      v-else
      class="pt-12 px-4"
    >
      <title-header
        title="주간 예보"
        :sub-title="currentPageSubTitle"
        class="pb-8"
      />
      <div>
        <daily-weather-card
          v-for="(dayWeather, index) in oneWeekWeathers"
          :key="dayWeather.dateTime"
          :day-weather="dayWeather"
          :is-today="index === 0"
          :is-move-to-detail-button-view="index < 2"
          @moveToDetail="moveToDetail(dayWeather.date)"
        />
      </div>
    </div>
    <bottom-navigation />
  </div>
</template>
<script>
import BottomNavigation from '@/ui/components/layout/BottomNavigation'
import TitleHeader from '@/ui/components/TitleHeader'
import { mapActions, mapGetters } from 'vuex'
import CircularLoading from '@/ui/components/CircularLoading'
import DailyWeatherCard from '@/ui/views/OneWeekForecast/DailyWeatherCard'
import locationDomain from '@/service/domain/location'
import weatherDomain from '@/service/domain/weather'

export default {
  name: 'OneWeekForecast',
  components: {
    BottomNavigation,
    DailyWeatherCard,
    TitleHeader,
    CircularLoading,
  },
  computed: {
    ...mapGetters('auth', ['priorityLocation', 'selectedLocation']),
    ...mapGetters('weather', ['oneWeekWeathers']),
    ...mapGetters('loading', ['isLoading']),
    currentPageSubTitle() {
      return this.priorityLocation?.location
    },
    backgroundImageStyle() {
      return {
        'background-image': `url(${weatherDomain.getWeatherBackground(this.oneWeekWeathers[0]?.main)})`,
        'background-size': 'cover',
      }
    },
  },
  created() {
    this.fetchInitOneWeekWeathers()
  },
  methods: {
    ...mapActions('auth', ['currentLocationSetting']),
    ...mapActions('weather', ['oneWeekWeathersSetting']),
    ...mapActions('loading', ['turnOnLoading', 'turnOffLoading']),
    async fetchInitOneWeekWeathers() {
      this.turnOnLoading()
      await this.fetchCurrentLocation()
      await this.fetchOneWeekWeathers()
      this.turnOffLoading()
    },
    async fetchCurrentLocation() {
      if (!this.selectedLocation) {
        await this.currentLocationSetting()
      }
    },
    async fetchOneWeekWeathers() {
      await this.oneWeekWeathersSetting(locationDomain.getLocationParams(this.priorityLocation))
    },
    moveToDetail(date) {
      this.$router.push(`/forecast-detail/table/${date}`)
    },
  },
}
</script>
