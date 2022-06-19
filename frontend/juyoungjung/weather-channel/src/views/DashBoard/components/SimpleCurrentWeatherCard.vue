<template>
  <v-card>
    <v-skeleton-loader
      v-if="!simpleCurrentWeatherData"
      height="450"
      class="pa-6"
      type="image, image"
    />

    <div
      v-else
      class="mx-auto pt-4 px-4 pb-2"
    >
      <simple-current-weather-card-main-content />

      <simple-current-weather-card-sub-content />

      <v-divider class="mb-2" />

      <v-card-actions class="d-flex justify-end">
        <v-btn
          outlined
          color="primary"
          @click="goToForecastHourlyPage"
        >
          자세히
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { checkRefreshTokenMixin } from '@/mixins'
import SimpleCurrentWeatherCardMainContent from './SimpleCurrentWeatherCardMainContent.vue'
import SimpleCurrentWeatherCardSubContent from './SimpleCurrentWeatherCardSubContent.vue'

export default {
  name: 'SimpleCurrentWeatherCard',
  components: { SimpleCurrentWeatherCardMainContent, SimpleCurrentWeatherCardSubContent },
  mixins: [checkRefreshTokenMixin],
  computed: {
    ...mapGetters('weather', [
      'simpleCurrentWeatherData',
    ]),
  },
  methods: {
    goToForecastHourlyPage() {
      if (this.isRefreshTokenSavedAtLocalStorageMixin()) {
        this.$router.push('/detail-forecast/hourly')
      } else {
        this.$store.dispatch('user/setLoginFormModalVisible', {
          visible: true,
        })
      }
    },
  },
}
</script>
