<template>
  <v-card
    color="white"
    class="ma-1 pa-1"
    hover
    width="180"
    height="250"
    @click="goToForecastDailyPageHash(forecastData.key)"
  >
    <v-row
      class="fill-height d-flex justify-center text-center"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 my-2">
            {{ forecastData.date }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-h6 mb-1">
            {{ forecastData.temp }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            체감온도: {{ forecastData.feels_like }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item class="d-flex justify-center">
        <div>
          <v-img
            :src="$_makeIconUrl(forecastData.icon)"
            alt="weather icon"
          />
        </div>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="light-blue">
            mdi-water
          </v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>
          강수량 {{ forecastData.rain || '0mm/h' }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-row>
  </v-card>
</template>
<script>
import { openWeatherMapIconMixin, checkRefreshTokenMixin } from '@/mixins'

export default {
  name: 'SimpleDailySlideCard',
  mixins: [openWeatherMapIconMixin, checkRefreshTokenMixin],
  props: {
    forecastData: {
      type: Object,
      default: () => ({
        key: '',
        date: '',
        temp: '',
        feels_like: '',
        icon: '',
        rain: '',
      }),
    },
  },
  methods: {
    goToForecastDailyPageHash(key) {
      if (this.$_isRefreshTokenSavedAtLocalStorage()) {
        this.$router.push({ path: '/detail-forecast/daily', hash: key })
      } else {
        this.$store.dispatch('user/setLoginFormModalVisible', {
          visible: true,
        })
      }
    },
  },
}
</script>
