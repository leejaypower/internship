<template>
  <v-sheet class="d-flex justify-center py-4">
    <v-slide-group
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="data in forecastDaily7DaysList"
        :key="data.key"
      >
        <v-card
          class="ml-1"
          color="white"
          hover
          width="150"
          height="200"
          elevation="8"
          @click="goToForecastDailyPageHash(data.key)"
        >
          <div
            class="fill-height d-flex flex-column justify-center text-center pa-2"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6 my-3">
                  {{ data.day }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-h5 mb-2">
                  {{ data.temp }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="d-flex justify-center">
              <div>
                <v-img
                  :src="makeIconUrlMixin(data.icon)"
                  alt="weather icon"
                />
              </div>
            </v-list-item>
          </div>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
import { mapGetters } from 'vuex'
import { openWeatherMapIconMixin } from '@/mixins'

export default {
  name: 'ForecastDailySlideCardGroup',
  mixins: [openWeatherMapIconMixin],
  props: {
    hashKey: {
      type: String,
      default: '',
    },
  },
  emits: ['onChangeHashKey'],
  computed: {
    ...mapGetters('weather', ['forecastDaily7DaysList']),
  },
  methods: {
    goToForecastDailyPageHash(key) {
      if (key !== this.hashKey) {
        this.$router.push({ path: '/detail-forecast/daily', hash: key })
        this.$emit('onChangeHashKey', key)
      }
    },
  },
}
</script>
