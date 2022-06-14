<template>
  <div>
    <response-info-alert />
    <response-error-info-alert />

    <v-container class="dashboard-container">
      <v-row class="pa-4">
        <v-col
          cols="12"
          md="8"
        >
          <h1>
            The Weather Channel with Vue
          </h1>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="d-flex justify-end align-center"
        >
          <div class="reset-btn-wrapper">
            <v-btn
              color="red"
              outlined
              fab
              x-small
              @click="resetOneCallApiData"
            >
              <v-icon>mdi-restore</v-icon>
            </v-btn>
          </div>
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
          cols="12"
          lg="8"
          class="d-flex flex-column justify-center"
        >
          <v-col cols="12">
            <search-location-input-card />
          </v-col>

          <v-col cols="12">
            <simple-daily-weather-card />
          </v-col>
        </v-col>
      </v-row>

      <scroll-to-top-btn />
    </v-container>

    <login-form-modal />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ResponseInfoAlert from '@/components/ResponseInfoAlert.vue'
import ScrollToTopBtn from '@/components/ScrollToTopBtn.vue'
import ResponseErrorInfoAlert from '@/components/ResponseErrorInfoAlert.vue'
import SimpleDailyWeatherCard from './components/SimpleDailyWeatherCard.vue'
import SimpleCurrentWeatherCard from './components/SimpleCurrentWeatherCard.vue'
import LoginFormModal from './components/LoginFormModal.vue'
import SearchLocationInputCard from './components/SearchLocationInputCard.vue'

export default {
  name: 'DashBoard',
  components: {
    ResponseInfoAlert,
    ResponseErrorInfoAlert,
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
