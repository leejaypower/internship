<template>
  <v-card
    class="mx-auto pa-6 mt-6"
  >
    <v-skeleton-loader
      v-if="!forecastDaily4DaysList"
      class="ma-auto"
      height="300"
      type="image, image"
    />

    <div v-else>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            일일예보
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <simple-daily-slide-group />
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { openWeatherMapIconMixin, checkRefreshTokenMixin } from '@/mixins'
import SimpleDailySlideGroup from './SimpleDailySlideGroup.vue'

export default {
  name: 'SimpleDailyWeatherCard',
  components: { SimpleDailySlideGroup },
  mixins: [openWeatherMapIconMixin, checkRefreshTokenMixin],
  computed: {
    ...mapGetters('weather', ['forecastDaily4DaysList']),
  },
}
</script>
