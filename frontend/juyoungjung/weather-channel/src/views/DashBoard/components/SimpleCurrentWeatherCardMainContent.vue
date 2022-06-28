<template>
  <div>
    <div class="d-flex justify-space-between">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 mb-2">
            {{ currentLocation }}
          </v-list-item-title>
          <v-list-item-subtitle class="mb-2">
            {{ simpleCurrentWeatherData.date }},
            {{ simpleCurrentWeatherData.day }},
            {{ simpleCurrentWeatherData.time }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{ simpleCurrentWeatherData.desc }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>

    <v-card-text>
      <v-row class="d-flex justify-center align-center">
        <v-col
          class="text-h3 d-flex justify-center align-center"
          cols="7"
        >
          <span> {{ simpleCurrentWeatherData.temp }}</span>
        </v-col>
        <v-col
          class="d-flex justify-center align-center"
          md="5"
          sm="3"
        >
          <v-img
            :src="makeIconUrlMixin(simpleCurrentWeatherData.icon)"
            alt="weather icon"
            width="100"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { openWeatherMapIconMixin } from '@/mixins'

export default {
  name: 'SimpleCurrentWeatherCardMainContent',
  mixins: [openWeatherMapIconMixin],
  computed: {
    ...mapGetters('weather', [
      'currentLocation',
      'simpleCurrentWeatherData',
    ]),
  },
}
</script>
