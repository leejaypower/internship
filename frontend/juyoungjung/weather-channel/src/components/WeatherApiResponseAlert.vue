<template>
  <v-alert
    :value="weatherApiResponse.visible"
    :type="weatherApiResponse.type"
    dismissible
    @input="closeAlert"
  >
    <span>{{ weatherApiResponseText }}</span>
  </v-alert>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'WeatherApiResponseAlert',
  computed: {
    ...mapGetters('alert', ['weatherApiResponse', 'weatherApiResponseText']),
  },
  updated() {
    this.$vuetify.goTo(0)
  },
  methods: {
    closeAlert() {
      this.$store.dispatch('alert/resetWeatherApiResponse')
    },
  },
}
</script>
