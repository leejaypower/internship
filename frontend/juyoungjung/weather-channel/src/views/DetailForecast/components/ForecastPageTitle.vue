<template>
  <v-row class="d-flex align-center justify-space-between px-3 py-6">
    <v-col
      cols="12"
      lg="4"
    >
      <h1>{{ title }}</h1>
      <h5 class="grey--text">
        {{ subTitle }}
      </h5>
    </v-col>
    <v-col
      v-if="forecastData"
      cols="6"
      lg="4"
    >
      <h3><span class="blue-grey--text">현재 위치</span> {{ currentLocation }}</h3>
    </v-col>

    <v-col
      v-if="forecastData"
      cols="1"
    >
      <v-btn
        color="red"
        outlined
        fab
        x-small
        @click="setForecastData"
      >
        <v-icon>mdi-restore</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    forecastData: {
      type: Array,
      default: null,
    },
  },
  computed: {
    ...mapGetters('weather', [
      'currentLocation', 'currentCoords',
    ]),
  },
  methods: {
    setForecastData() {
      this.$store.dispatch('weather/getOneCallApi', this.currentCoords)
    },
  },
}
</script>
