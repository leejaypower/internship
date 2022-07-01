<template>
  <div
    class="d-flex flex-column pa-4 full-height"
    :style="backgroundImageStyle"
  >
    <div>
      <v-icon
        x-large
        color="#2196F3"
        class="back-arrow-wrapper"
        @click="handleBackArrow"
      >
        mdi-arrow-left
      </v-icon>
    </div>
    <div
      class="d-flex flex-column full-height"
    >
      <title-header
        :title="currentPageTitle"
        :sub-title="currentPageSubTitle"
      />
      <div class="weather-content-wrapper pb-4">
        <circular-loading
          v-if="isLoading"
          background-color="#FFFFFF"
        />
        <router-view v-else />
      </div>
    </div>
    <weather-view-switch :date="$route.params.date" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CircularLoading from '@/ui/components/CircularLoading'
import TitleHeader from '@/ui/components/TitleHeader'
import WeatherViewSwitch from '@/ui/views/ForecastDetail/WeatherViewSwitch'
import locationDomain from '@/service/domain/location'
import dayjs from 'dayjs'
import weatherDomain from '@/service/domain/weather'

export default {
  name: 'ForecastDetail',
  components: { CircularLoading, TitleHeader, WeatherViewSwitch },
  computed: {
    ...mapGetters('auth', ['priorityLocation', 'selectedLocation']),
    ...mapGetters('weather', ['hourlyWeathers']),
    ...mapGetters('loading', ['isLoading']),
    currentPageTitle() {
      if (this.isLoading) {
        return '날씨 불러오는 중 🚴...'
      }
      return this.priorityLocation?.location
    },
    currentPageSubTitle() {
      if (!dayjs(this.$route.params.date).isValid()) {
        return '알 수 없음'
      }
      return dayjs(this.$route.params.date).format('YYYY년 MM월 DD일')
    },
    backgroundImageStyle() {
      return {
        'background-image': `url(${weatherDomain.getWeatherBackground(this.hourlyWeathers[0]?.main)})`,
        'background-size': 'cover',
      }
    },
  },
  created() {
    this.initHourlyWeathersFetch()
  },
  methods: {
    ...mapActions('auth', ['currentLocationSetting']),
    ...mapActions('weather', ['hourlyWeathersSetting']),
    ...mapActions('loading', ['turnOnLoading', 'turnOffLoading']),
    async initHourlyWeathersFetch() {
      this.turnOnLoading()
      await this.currentLocationFetch()
      await this.hourlyWeathersFetch()
      this.turnOffLoading()
    },
    async currentLocationFetch() {
      if (!this.selectedLocation) {
        await this.currentLocationSetting()
      }
    },
    async hourlyWeathersFetch() {
      this.turnOnLoading()
      await this.hourlyWeathersSetting(locationDomain.getLocationParams(this.priorityLocation))
      this.turnOffLoading()
    },
    handleBackArrow() {
      this.$router.back()
    },
  },
}
</script>

<style>
.weather-content-wrapper{
  height: 75%;
}

.back-arrow-wrapper {
  background: white;
}
</style>
