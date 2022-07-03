<template>
  <div class="d-flex dashboard-container flex-column fill-height pr-15 pl-15 ">
    <my-location />
    <div
      class="cards-container d-flex flex-wrap justify-space-between fill-height align-content-start"
    >
      <weather-card
        v-for="(property,i) in weatherProperties"
        :key="i"
        :kind="property"
      />
      <ForecastCard />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MyLocation from '@/views/servicePage/components/MyLocation.vue'
import WeatherCard from '@/views/servicePage/components/WeatherCard.vue'
import ForecastCard from '@/views/servicePage/components/ForecastCard.vue'

export default {
  name: 'AppDashboard',
  components: {
    MyLocation, WeatherCard, ForecastCard,
  },
  data() {
    return {
      weatherProperties: ['temp', 'rainOrSnow', 'clouds'],
    }
  },
  computed: {
    ...mapGetters('userInfoStore', ['getStoredMyInfo']),
    ...mapGetters('weatherStore', ['getTempLocation', 'getReferenceCoordinate']),
  },
  watch: {
    getReferenceCoordinate() {
      this.getCurrentWeather()
    },
  },
  created() {
    if (this.getReferenceCoordinate.lat && this.getReferenceCoordinate.lon) {
      this.getCurrentWeather()
    }
  },
  methods: {
    ...mapActions('weatherStore', ['weatherStore', 'getCurrentWeather']),
  },
}
</script>

<style scoped>
 .cards-container{
   width:100%;
 }
 .dashboard-container{
   width:100%;
 }
</style>
