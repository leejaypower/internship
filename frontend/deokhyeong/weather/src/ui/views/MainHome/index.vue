<template>
  <div
    class="d-flex flex-column full-height"
    :style="backgroundImageStyle"
  >
    <circular-loading v-if="isLoading" />
    <div
      v-else
      class="d-flex flex-column pa-12 full-height"
    >
      <title-header
        :title="currentPageTitle"
        :sub-title="currentPageSubTitle"
      />
      <current-weather
        :current-weather="currentWeather"
        :current-air-pollution="currentAirPollution"
        @moveToWeatherDetail="moveToWeatherDetail"
      />
    </div>
    <bottom-navigation />
  </div>
</template>

<script>
import BottomNavigation from '@/ui/components/layout/BottomNavigation'
import TitleHeader from '@/ui/components/TitleHeader'
import { mapActions, mapGetters } from 'vuex'
import CircularLoading from '@/ui/components/CircularLoading'
import CurrentWeather from '@/ui/views/MainHome/CurrentWeather'
import utils from '@/utils'
import locationDomain from '@/service/domain/location'
import weatherDomain from '@/service/domain/weather'

export default {
  name: 'MainHome',
  components: {
    BottomNavigation,
    TitleHeader,
    CircularLoading,
    CurrentWeather,
  },
  data() {
    return {
      weatherIntervalCallId: null,
    }
  },
  computed: {
    ...mapGetters('auth', ['priorityLocation', 'selectedLocation']),
    ...mapGetters('weather', ['currentWeather', 'currentAirPollution']),
    ...mapGetters('loading', ['isLoading']),
    currentPageTitle() {
      return this.priorityLocation?.location?.split('/')[0]
    },
    currentPageSubTitle() {
      return this.priorityLocation?.location?.split('/')[1] || ''
    },
    backgroundImageStyle() {
      return {
        'background-image': `url(${weatherDomain.getWeatherBackground(this.currentWeather.main)})`,
        'background-size': 'cover',
      }
    },
  },
  created() {
    this.fetchInitWeather()
    this.weatherIntervalCallId = utils.intervalCall(this.fetchInitWeather, 1, 'min')
  },
  beforeDestroy() {
    clearInterval(this.weatherIntervalCallId)
  },
  methods: {
    ...mapActions('auth', ['currentLocationSetting']),
    ...mapActions('weather', ['currentWeatherSetting', 'currentAirPollutionSetting']),
    ...mapActions('loading', ['turnOnLoading', 'turnOffLoading']),
    async fetchInitWeather() {
      this.turnOnLoading()
      await this.fetchCurrentLocation()
      await this.fetchCurrentWeather()
      this.turnOffLoading()
    },
    async fetchCurrentLocation() {
      if (!this.selectedLocation) {
        await this.currentLocationSetting()
      }
    },
    async fetchCurrentWeather() {
      const locationParams = locationDomain.getLocationParams(this.priorityLocation)
      const currentWeatherResponse = this.currentWeatherSetting(locationParams)
      const currentAirPollutionResponse = this.currentAirPollutionSetting(locationParams)
      await Promise.allSettled(
        [currentWeatherResponse, currentAirPollutionResponse],
      )
    },
    moveToWeatherDetail() {
      this.$router.push(`/forecast-detail/table/${this.currentWeather.date}`)
    },
  },
}
</script>
