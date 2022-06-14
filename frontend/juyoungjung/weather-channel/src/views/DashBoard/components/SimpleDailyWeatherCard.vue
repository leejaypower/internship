<template>
  <v-container>
    <v-card
      class="mx-auto pa-5"
    >
      <v-skeleton-loader
        v-if="!forecastDaily4DaysData"
        class="ma-auto"
        height="300"
        type="image, image"
      />

      <div v-else>
        <v-row>
          <v-col>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  일일예보
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>

        <simple-daily-slide-group />
      </div>
    </v-card>
  </v-container>
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
    ...mapGetters('weather', ['forecastDaily4DaysData']),
  },
}
</script>
