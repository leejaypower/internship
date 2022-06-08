<template>
  <div
    class="d-flex flex-column full-height"
  >
    <circular-loading v-if="isLoading" />
    <div
      v-else
      class="d-flex flex-column pa-12 full-height"
    >
      <title-header
        :title="currentPageTitle"
      />
      <current-weather
        :current-weather="currentWeather"
        :current-air-pollution="currentAirPollution"
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
    ...mapGetters('auth', ['currentLocation', 'selectedLocation', 'defaultLocation']),
    ...mapGetters('weather', ['currentWeather', 'currentAirPollution']),
    ...mapGetters('loading', ['isLoading']),

    currentPageTitle() {
      return this.selectedLocation?.location
       || this.currentLocation?.location
       || this.defaultLocation?.location
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
    getlocationParams(currentLocation, selectedLocation, defaultLocation) {
      if (selectedLocation) {
        return {
          lat: selectedLocation.lat,
          lon: selectedLocation.long,
        }
      }
      if (currentLocation) {
        return {
          lat: currentLocation.lat,
          lon: currentLocation.long,
        }
      }
      return {
        lat: defaultLocation.lat,
        lon: defaultLocation.long,
      }
    },
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
      const locationParams = this.getlocationParams(
        this.currentLocation,
        this.selectedLocation,
        this.defaultLocation,
      )
      const currentWeatherResponse = this.currentWeatherSetting(locationParams)
      const currentAirPollutionResponse = this.currentAirPollutionSetting(locationParams)
      await Promise.allSettled(
        [currentWeatherResponse, currentAirPollutionResponse],
      )
    },
  },
}
</script>
