<template>
  <v-container>
    <v-card
      class="mx-auto pa-5"
    >
      <v-skeleton-loader
        v-if="!simpleCurrentWeatherData.date"
        height="450"
        type="image, image"
      />

      <div v-else>
        <v-row justify-space-between>
          <v-col>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="text-h6 mb-3">
                  {{ currentLocation }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ simpleCurrentWeatherData.date }},
                  {{ simpleCurrentWeatherData.day }},
                  {{ simpleCurrentWeatherData.time }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ simpleCurrentWeatherData.desc }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>

        <v-card-text>
          <v-row class="d-flex justify-center align-center">
            <v-col
              class="text-h3 d-flex justify-center align-center"
              cols="12"
              sm="7"
            >
              <span> {{ simpleCurrentWeatherData.temp }}</span>
            </v-col>
            <v-col
              class="d-flex justify-center align-center"
              cols="7"
              sm="5"
            >
              <v-img
                :src="$_makeIconUrl(simpleCurrentWeatherData.icon)"
                alt="weather icon"
                width="100"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="light-blue">
              mdi-thermometer-plus
            </v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            체감온도 {{ simpleCurrentWeatherData.feels_like }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="light-blue">
              mdi-send
            </v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            풍속 {{ simpleCurrentWeatherData.wind_speed }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="light-blue">
              mdi-water
            </v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            강수량 {{ simpleCurrentWeatherData.rain || '0mm/h' }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-divider />

        <v-card-actions class="d-flex justify-end pt-2">
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
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { openWeatherMapIconMixin, checkRefreshTokenMixin } from '@/mixins'

export default {
  name: 'SimpleCurrentWeatherCard',
  mixins: [openWeatherMapIconMixin, checkRefreshTokenMixin],
  computed: {
    ...mapGetters('weather', [
      'currentCoords',
      'currentLocation',
      'simpleCurrentWeatherData',
    ]),
  },
  methods: {
    goToForecastHourlyPage() {
      if (this.$_isRefreshTokenSavedAtLocalStorage()) {
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
