<template>
  <v-container class="pa-5">
    <error-alert />
    <v-row>
      <v-col>
        <h1
          class="header ml-2 d-inline-block"
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
    </v-row>
    <v-row>
      <v-col>
        <v-skeleton-loader
          v-if="isLoading"
          type="table-tbody"
        />
        <v-expansion-panels
          v-if="!isLoading && !errorInfo.show"
          popout
          focusable
        >
          <v-expansion-panel
            v-for="(data, i) in dailyWeather"
            :key="data.id"
          >
            <v-expansion-panel-header
              class="d-flex flex-wrap"
            >
              <p>
                <b>{{ data.day }}</b>일
              </p>
              <p><b>{{ data.date }}</b>요일</p>

              <img
                :src="`http://openweathermap.org/img/wn/${data.icon}@2x.png`"
                alt="날씨 아이콘"
              >

              <p>최고 <b>{{ maxTemp(data) }}</b></p>
              <p>최저 <b>{{ minTemp(data) }}</b></p>
              <p>강수 확률 <b>{{ rain(data) }}</b></p>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="text-center">
              <p
                class="ma-2 pa-2 main-desc"
              >
                <b>{{ data.desc }}</b>
              </p>
              <br>
              <p class="pa-2 pa-md-4">
                습도 <b>{{ data.humidity }}</b>
              </p>
              <p class="pa-2 pa-md-4">
                자외선 지수 <b>{{ data.uvi }}</b>
              </p>
              <p class="pa-2 pa-md-4">
                일출 <b>{{ data.sunrise }}</b>
              </p>
              <p class="pa-2 pa-md-4">
                일몰 <b>{{ data.sunset }}</b>
              </p>
              <v-divider class="mb-5" />
              <spark-line :daily-weather="dailyWeather[i]" />
              <div class="ma-2">
                <p class="mb-2">
                  이 날 최고 기온은 <b>
                    지금({{ checkCurrentTemp }}</b>
                  <small> - {{ currentTime }}시 </small>
                  <b>){{ compareTemp(data.maxTemp) }}고, &nbsp;</b>
                </p>
                <p>
                  최저 기온은 <b> 지금({{ checkCurrentTemp }}</b>
                  <small> - {{ currentTime }}시 </small>
                  <b>){{ compareTemp(data.minTemp) }}아요</b>
                </p>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import dayjs from 'dayjs'
import 'dayjs/locale/ko'

import { v4 as uuidv4 } from 'uuid'

import ErrorAlert from '@/components/ErrorAlert.vue'
import SparkLine from '@/components/SparkLine.vue'
import weatherDesc from '@/util/weatherDesc'

dayjs.locale('ko')

const { mapGetters: weatherGetters } = createNamespacedHelpers('weatherStore')
const { mapGetters: locationGetters } = createNamespacedHelpers('locationStore')
const { mapGetters: alertGetters } = createNamespacedHelpers('alertStore')

export default {
  components: { ErrorAlert, SparkLine },
  data: () => ({
    dailyWeather: [],
    currentTime: '',
  }),
  computed: {
    ...weatherGetters(['temperature', 'currentWeatherResponse', 'dailyWeatherResponse']),
    ...alertGetters(['isLoading', 'errorInfo']),
    ...locationGetters(['lat', 'lon', 'address']),
    checkCurrentTemp() {
      return this.temperature !== '-' ? `${Math.floor(this.temperature)}℃` : this.temperature
    },
  },
  async created() {
    if (this.currentWeatherResponse.current && this.dailyWeatherResponse.daily) {
      this.currentTime = this.setCurrentTime(this.currentWeatherResponse.current)
      this.dailyWeather = this.setWeekWeather(this.dailyWeatherResponse.daily)
      return
    }

    if (this.currentWeatherResponse.current && !this.dailyWeatherResponse.daily) {
      await this.getDailyWeather()
      this.dailyWeather = this.setWeekWeather(this.dailyWeatherResponse.daily)
      return
    }

    await this.getWeather()
    if (this.errorInfo.show) {
      this.$store.dispatch('alertStore/setAlertInfo', { type: 'error', message: '데이터를 받아오지 못했습니다. 다시 시도해주세요.' })
      return
    }
    this.currentTime = this.setCurrentTime(this.currentWeatherResponse.current)
    this.dailyWeather = this.setWeekWeather(this.dailyWeatherResponse.daily)
  },
  methods: {
    async getWeather() {
      await this.$store.dispatch('locationStore/fetchLocation')
      const { lat, lon } = this
      await this.$store.dispatch('locationStore/fetchAddress')
      await this.$store.dispatch('weatherStore/fetchCurrentAndDailyWeather', { lat, lon })
    },

    async getDailyWeather() {
      const { lat, lon } = this
      await this.$store.dispatch('weatherStore/fetchDailyWeather', { lat, lon })
    },

    async refreshLocation() {
      await this.getWeather()
      if (this.errorInfo.show) {
        this.$store.dispatch('alertStore/setAlertInfo', { type: 'error', message: '데이터를 받아오지 못했습니다. 다시 시도해주세요.' })
        return
      }
      this.currentTime = this.setCurrentTime(this.currentWeatherResponse.current)
      this.dailyWeather = this.setWeekWeather(this.dailyWeatherResponse.daily)
    },

    setWeekWeather(weekArr) {
      return weekArr.map((item) => {
        const time = dayjs.unix(item.dt)
        return ({
          id: uuidv4(),
          day: time.format('M월 DD'),
          date: time.format('ddd'),
          maxTemp: Math.floor(item.temp.max),
          minTemp: Math.floor(item.temp.min),
          rain: Math.floor(item.pop * 100),
          sunrise: dayjs.unix(item.sunrise).format('HH:mm'),
          sunset: dayjs.unix(item.sunset).format('HH:mm'),
          humidity: item.humidity,
          uvi: item.uvi,
          desc: (weatherDesc
            .filter((descItem) => item.weather[0].id in descItem)[0])[item.weather[0].id],
          icon: item.weather[0].icon,
          hourlyTemp: [item.temp.morn, item.temp.day, item.temp.eve, item.temp.night],
        })
      })
    },
    setCurrentTime(currentObj) {
      return dayjs.unix(currentObj.dt).format('HH')
    },

    maxTemp(data) {
      return `${data.maxTemp} ℃`
    },
    minTemp(data) {
      return `${data.minTemp} ℃`
    },
    rain(data) {
      return `${data.rain} %`
    },

    compareTemp(temp) {
      if (this.temperature !== '-') {
        const currentTemp = Math.floor(this.temperature)
        if (currentTemp === temp) {
          return '과 같'
        }
        if (currentTemp < temp) {
          return `보다 약 ${temp - currentTemp} ℃ 높`
        }
        return `보다 약 ${currentTemp - temp} ℃ 낮`
      }
      return '-'
    },
  },
}
</script>

<style scoped>
h1{
  font-weight: 200;
}
h2{
  font-weight: 200;
}

p{
  display: inline-block;
  font-size: 1rem;
  font-weight: 200;
  text-align: center;
  margin-bottom: 0;
}

b{
  display: inline-block;
}

img{
  max-width: 70px;
}

.v-expansion-panel-header > p{
  width: 70px
}

.main-desc{
  border: 1px solid lightgray;
  border-radius: 10px
}

</style>
