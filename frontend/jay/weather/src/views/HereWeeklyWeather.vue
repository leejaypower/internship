<template>
  <v-container class="pa-5">
    <error-alert />
    <v-row>
      <v-col
        cols="12"
      >
        <v-skeleton-loader
          v-if="isLoading"
          type="article, table-tbody"
        />
      </v-col>
    </v-row>
    <v-row
      v-if="!isLoading && !errorInfo.show"
      justify="center"
    >
      <v-col
        cols="12"
      >
        <h1
          class="header ml-2"
        >
          <b>{{ address }}</b> 주간 예보
        </h1>
        <v-btn
          icon
          color="green"
          class="ml-2 mb-4"
          small
          fab
          @click="refreshLocation()"
        >
          <v-icon>
            mdi-cached
          </v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols="12"
      >
        <v-card
          outlined
        >
          <v-card-text>
            <span
              v-for="data in dailyWeather"
              :key="data.id"
              class="daily-data-wrapper pa-2"
            >

              <p>
                <b>{{ data.day }}</b>일
              </p>
              <p>
                <b>{{ data.date }}</b>요일
              </p>
              <img
                :src="`http://openweathermap.org/img/wn/${data.icon}@2x.png`"
                alt=""
              >
              <p>
                최고 <b>{{ data.maxTemp }} ℃</b>
              </p>
              <p>
                최저 <b>{{ data.minTemp }} ℃</b>
              </p>
              <p>
                강수 확률 <b>{{ data.rain }} %</b>
              </p>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import dayjs from 'dayjs'
import 'dayjs/locale/ko'

import ErrorAlert from '@/components/ErrorAlert.vue'

dayjs.locale('ko')

const { mapGetters: weatherGetters } = createNamespacedHelpers('weatherStore')
const { mapGetters: locationGetters } = createNamespacedHelpers('locationStore')
const { mapGetters: alertGetters } = createNamespacedHelpers('alertStore')

export default {
  components: { ErrorAlert },
  data: () => ({
    dailyWeather: [],
  }),
  computed: {
    ...weatherGetters(['temp', 'dailyWeatherResponse']),
    ...alertGetters(['isLoading', 'errorInfo']),
    ...locationGetters(['lat', 'lon', 'address']),
  },
  created() {
    if (this.dailyWeatherResponse.data) {
      const weekArr = this.dailyWeatherResponse.data.daily
      this.setWeather(weekArr)
      return
    }
    this.getWeather()
  },
  methods: {
    async getWeather() {
      await this.$store.dispatch('locationStore/fetchLocation')
      const { lat, lon } = this

      await this.$store.dispatch('locationStore/fetchAddress')
      const response = await this.$store.dispatch('weatherStore/fetchDailyWeather', { lat, lon })
      if (response !== false) {
        const weekArr = response.data.daily
        this.setWeather(weekArr)
      }
    },

    setWeather(weekArr) {
      if (this.dailyWeather.length > 0) {
        this.dailyWeather = []
      }
      this.dailyWeather = weekArr.map((item) => ({
        id: item.dt,
        day: dayjs.unix(item.dt).format('M월 DD'),
        date: dayjs.unix(item.dt).format('ddd'),
        maxTemp: Math.floor(item.temp.max),
        minTemp: Math.floor(item.temp.min),
        rain: Math.floor(item.pop * 100),
        icon: item.weather[0].icon,
      }))
    },

    async refreshLocation() {
      await this.getWeather()
    },

  },
}
</script>

<style scoped>
h1{
  display: inline-block;
  font-weight: 200;
}
h2{
  font-weight: 200;
}

p{
  font-size: 1rem;
  font-weight: 200;
  text-align: center;
}

li{
  padding: 5px;
}

.v-card__text{
  white-space: nowrap;
  overflow: scroll;
}

.v-card__text > span:last-child{
  border-right: none
}

.daily-data-wrapper{
  display: inline-block;
  border-right: 1px solid #EEEEEE
}

</style>
