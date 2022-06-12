<template>
  <v-container class="pa-5">
    <error-alert />
    <v-row>
      <v-col
        cols="12"
      >
        <v-skeleton-loader
          v-if="isLoading"
          type="article, list-item-two-line, image"
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
        <h1 class="header ml-2">
          오늘 <b>{{ address }}</b> 날씨
        </h1>
        <v-btn
          icon
          color="green"
          class="ml-2 mb-4"
          small
          fab
          @click="getWeather()"
        >
          <v-icon>
            mdi-cached
          </v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols="12"
      >
        <div class="weather-detail justify-center flex-wrap">
          <img
            :src="iconUrl"
            alt="날씨 아이콘"
          >
          <ul class="detail-list pt-3 pl-0">
            <li>체감 온도 <b>{{ currentWeather.feels_like }} ℃</b></li>
            <li>자외선 지수 <b>{{ currentWeather.uvi }}</b></li>
            <li>습도 <b>{{ currentWeather.humidity }}</b></li>
            <li>
              일출/일몰 <b>{{ sunrise }} / {{ sunset }}</b>
            </li>
          </ul>
        </div>
        <h2 class="weather-summary">
          <b>{{ temp }} ℃ </b>| {{ desc }}
        </h2>
      </v-col>
      <v-col
        cols="12"
      >
        <v-card
          outlined
          class="grey lighten-5"
        >
          <v-card-title>
            시간별 예보
          </v-card-title>
          <v-card-text>
            <span
              v-for="data in hourData"
              :key="data.id"
              class="hour-data-wrapper pa-3"
            >

              <p>
                <b>{{ data.hour }}</b>시
              </p>
              <img
                :src="`http://openweathermap.org/img/wn/${data.icon}.png`"
                alt=""
              >
              <p>
                <b>{{ data.temp }} ℃</b>
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
import weatherDesc from '@/util/weatherDesc'
import ErrorAlert from '@/components/ErrorAlert.vue'
import { v4 as uuidv4 } from 'uuid'

const { mapGetters: weatherGetters } = createNamespacedHelpers('weatherStore')
const { mapGetters: locationGetters } = createNamespacedHelpers('locationStore')
const { mapGetters: alertGetters } = createNamespacedHelpers('alertStore')

export default {
  components: { ErrorAlert },
  data: () => ({
    hourData: [],
    currentWeather: {},
    mainIcon: '',
    desc: '',
  }),
  computed: {
    ...weatherGetters(['temp', 'currentWeatherResponse']),
    ...alertGetters(['isLoading', 'errorInfo']),
    ...locationGetters(['lat', 'lon', 'address']),

    iconUrl() {
      return `http://openweathermap.org/img/wn/${this.mainIcon}@4x.png`
    },
    sunrise() {
      return dayjs.unix(this.currentWeather.sunrise).format('HH:mm')
    },
    sunset() {
      return dayjs.unix(this.currentWeather.sunset).format('HH:mm')
    },
  },
  created() {
    if (this.currentWeatherResponse.data) {
      this.setWeather(this.currentWeatherResponse)
      return
    }
    this.getWeather()
  },
  methods: {
    async getWeather() {
      await this.$store.dispatch('locationStore/fetchLocation')
      const { lat, lon } = this

      await this.$store.dispatch('locationStore/fetchAddress')
      const response = await this.$store.dispatch('weatherStore/fetchHereWeather', { lat, lon })

      if (response !== false) {
        this.setWeather(response)
      }
    },
    setWeather(response) {
      const currentWeather = response.data.current
      this.currentWeather = currentWeather

      const { icon } = currentWeather.weather[0]
      this.mainIcon = icon

      const { id } = response.data.current.weather[0]
      const descArr = weatherDesc.filter((item) => id in item)
      this.desc = (descArr[0])[id]

      if (this.hourData.length > 0) {
        this.hourData = []
      }

      const hourArr = response.data.hourly.slice()
      const resultArr = hourArr.splice(1, 24)

      this.hourData = resultArr.map((item) => ({
        id: uuidv4(),
        hour: dayjs.unix(item.dt).format('HH'),
        temp: Math.floor(item.temp),
        icon: item.weather[0].icon,
      }))
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

.hour-data-wrapper
{
  display: inline-block;
  border-right: 1px solid #EEEEEE
}
.weather-summary
{
  text-align: center;
}

.weather-detail{
  display: flex;
}

.detail-list
{
  list-style:none;
  font-weight: 200;
}
</style>
