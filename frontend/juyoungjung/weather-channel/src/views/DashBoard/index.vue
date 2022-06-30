<template>
  <div>
    <user-api-response-alert />
    <weather-api-response-alert />

    <v-container class="dashboard-container">
      <v-row class="px-4 py-10">
        <v-col
          cols="12"
          md="8"
        >
          <h1>
            The Weather Channel with Vue
          </h1>
        </v-col>

        <v-col
          md="4"
          class="d-flex justify-end align-center"
        >
          <v-tooltip
            top
            class="reset-btn-wrapper"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="red"
                outlined
                fab
                x-small
                :attrs="attrs"
                @click="resetOneCallApiData"
                v-on="on"
              >
                <v-icon>mdi-restore</v-icon>
              </v-btn>
            </template>
            <span>최신 날씨 현황을 가져옵니다.</span>
          </v-tooltip>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center align-center">
        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <simple-current-weather-card />
        </v-col>

        <v-col
          lg="8"
        >
          <search-location-input-card />

          <simple-daily-weather-card />
        </v-col>
      </v-row>

      <scroll-to-top-btn />
    </v-container>

    <login-form-modal />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserApiResponseAlert from '@/components/UserApiResponseAlert.vue'
import WeatherApiResponseAlert from '@/components/WeatherApiResponseAlert.vue'
import ScrollToTopBtn from '@/components/ScrollToTopBtn.vue'
import SimpleDailyWeatherCard from './components/SimpleDailyWeatherCard.vue'
import SimpleCurrentWeatherCard from './components/SimpleCurrentWeatherCard.vue'
import LoginFormModal from './components/LoginFormModal.vue'
import SearchLocationInputCard from './components/SearchLocationInputCard.vue'

export default {
  name: 'DashBoard',
  components: {
    UserApiResponseAlert,
    WeatherApiResponseAlert,
    SimpleCurrentWeatherCard,
    LoginFormModal,
    SimpleDailyWeatherCard,
    ScrollToTopBtn,
    SearchLocationInputCard,
  },
  computed: {
    ...mapGetters('weather', [
      'currentCoords',
    ]),
  },
  methods: {
    resetOneCallApiData() {
      this.$store.dispatch('weather/getOneCallApi', this.currentCoords)
    },
  },
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  width: 1200px;

  @media screen and (max-width: 1300px) {
    width: 100%;
  }
}
</style>
