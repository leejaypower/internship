<template>
  <div v-show="$vuetify.breakpoint.lgAndUp">
    <v-row
      class="mx-5 d-flex flex-row align-center"
      no-gutters
    >
      <v-col
        v-for="list in simpleForecastDaily7DaysList"
        :key="list.key"
      >
        <v-card
          height="160"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ list.day }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ list.temp }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="d-flex justify-center">
            <div>
              <v-img
                :src="makeIconUrlMixin(list.icon)"
                alt="weather icon"
              />
            </div>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import openWeatherMapIconMixin from '@/mixins/openweathermap-icon-mixin'

export default {
  name: 'ForecastDailyCardGroup',
  mixins: [openWeatherMapIconMixin],
  computed: {
    ...mapGetters('weather', [
      'simpleForecastDaily7DaysList',
    ]),
  },
}
</script>
