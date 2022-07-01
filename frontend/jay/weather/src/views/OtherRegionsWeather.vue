<template>
  <v-container class="pa-5">
    <error-alert />
    <v-row
      v-if="!error.show"
    >
      <v-col>
        <h1 class="ml-2">
          다른 지역 날씨
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        lg="6"
        md="8"
        sm="8"
        xs="10"
      >
        <div
          v-if="!error.show"
          class="map-wrapper"
        >
          <img
            src="@/assets/image/southKorea.jpeg"
            alt="남한 지도"
            class="map"
          >
          <v-btn
            v-for="data in regions"
            :key="data.name"
            elevation="2"
            text
            rounded
            class="map-overlay"
            :class="[{ active: data.name === activeBtn }, `place${data.eng}`]"
            @click="getWeather(data.name), selectBtn(data.name)"
          >
            {{ data.name }}
          </v-btn>
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="6"
        md="4"
        sm="4"
        xs="10"
      >
        <v-skeleton-loader
          v-if="isLoading"
          type="card-heading, image, list-item-avatar-three-line,
          list-item-avatar-three-line, list-item-avatar-three-line"
        />
        <div
          v-if="successAll"
          class="weather-info text-center align-center"
          justify="center"
        >
          <h1 class="header text-center">
            <b>{{ region }}</b>
          </h1>
          <img
            :src="`http://openweathermap.org/img/wn/${mainIcon}@2x.png`"
            class="justify-center"
            alt="날씨 아이콘"
          >
          <p><b>{{ currentWeather.temp }} ℃ </b>| {{ desc }}</p>
        </div>
        <v-card
          v-if="successAll"
          outlined
          class="grey lighten-5"
        >
          <v-card-title class="justify-center">
            {{ region }} 주간 예보
          </v-card-title>
          <v-card-text>
            <div
              v-for="data in dailyWeather"
              :key="data.id"
              class="daily-data-wrapper d-flex justify-center align-center flex-wrap"
            >
              <p class="mb-0">
                <b>{{ data.day }}</b>({{ data.date }})
              </p>
              <img
                :src="`http://openweathermap.org/img/wn/${data.icon}.png`"
                alt="날씨 아이콘"
              >
              <p class="mb-0">
                최고 <b>{{ data.maxTemp }} ℃ </b> |
              </p>
              <p class="mb-0">
                최저 <b> {{ data.minTemp }} ℃</b>
              </p>
            </div>
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
import regions from '@/util/regions'
import weatherDescMap from '@/util/weatherDesc'

dayjs.locale('ko')

const { mapGetters: alertGetters } = createNamespacedHelpers('alertStore')
const { mapGetters: weatherGetters } = createNamespacedHelpers('weatherStore')
const { mapGetters: errorGetters } = createNamespacedHelpers('errorStore')

export default {
  components: { ErrorAlert },
  data: () => ({
    regions,
    lat: '',
    lon: '',
    temp: '',
    region: '서울',
    desc: '',
    mainIcon: '',
    currentWeather: {},
    dailyWeather: [],
    activeBtn: '',
  }),

  computed: {
    ...alertGetters(['isLoading']),
    ...errorGetters(['error']),
    ...weatherGetters(['regionalcurrentWeather', 'regionalweeklyWeather']),
    successAll() {
      return !this.isLoading && !this.error.show
    },
  },

  async created() {
    await this.$store.dispatch('errorStore/clearError')

    const { lat, lon } = regions[0]
    await this.$store.dispatch('weatherStore/fetchDistrictWeather', { lat, lon })

    if (this.regionalcurrentWeather && this.regionalweeklyWeather) {
      this.setWeather(this.regionalcurrentWeather, this.regionalweeklyWeather)
    }
  },

  methods: {
    async getWeather(regionName) {
      this.region = regionName

      const region = regions.filter((item) => item.name === regionName)
      const { lat, lon } = region[0]
      await this.$store.dispatch('weatherStore/fetchDistrictWeather', { lat, lon })

      if (this.regionalcurrentWeather && this.regionalweeklyWeather) {
        this.setWeather(this.regionalcurrentWeather, this.regionalweeklyWeather)
      }
    },

    setWeather(currentWeather, weekArr) {
      this.currentWeather = currentWeather
      const { icon } = currentWeather.weather[0]
      this.mainIcon = icon

      const { id } = currentWeather.weather[0]
      const descArr = weatherDescMap.filter((item) => id in item)
      this.desc = (descArr[0])[id]

      if (this.dailyWeather.length > 0) {
        this.dailyWeather = []
      }

      this.dailyWeather = weekArr.map((item) => {
        const time = dayjs.unix(item.dt)
        return ({
          id: item.dt,
          day: time.format('M/D'),
          date: time.format('ddd'),
          maxTemp: Math.floor(item.temp.max),
          minTemp: Math.floor(item.temp.min),
          icon: item.weather[0].icon,
        })
      })
    },
    selectBtn(btnName) {
      this.activeBtn = btnName
    },
  },
}
</script>

<style scoped>
h1{
  font-weight: 200;
}

p{
  font-size: 1rem;
  font-weight: 200;
  text-align: center;
}

.weather-info > p{
  display: block;
}

.map{
  width: 100%;
}

.v-card__text{
  height: 300px;
  overflow: scroll;
}

.v-card__text > div:last-child{
  border-bottom: none
}

.daily-data-wrapper{
  border-bottom: 1px solid #EEEEEE;
}

.map-wrapper{
  position: relative;
}

.v-btn{
  font-weight: bolder;
}

.active{
  background-color: #A5B6AE;
  color: white
}

.placeSeoul{
  position: absolute;
  left: 35%;
  top: 15%;
}
.placeChuncheon{
  position: absolute;
  left: 50%;
  top: 13%;
}
.placeGang-neung{
  position: absolute;
  left: 60%;
  top: 10%;
}
.placeIncheon{
  position: absolute;
  left: 20%;
  top: 20%;
}
.placeSuwon{
  position: absolute;
  left: 30%;
  top: 25%;
}
.placeDaejeon{
  position: absolute;
  left: 42%;
  top: 38%;
}
.placeJeonju{
  position: absolute;
  left: 33%;
  top: 45%;
}
.placeMokpo{
  position: absolute;
  left: 20%;
  top: 65%;
}
.placeGwangju{
  position: absolute;
  left: 30%;
  top: 60%;
}
.placeYeosu{
  position: absolute;
  left: 45%;
  top: 60%;
}
.placeChangwon{
  position: absolute;
  left: 63%;
  top: 58%;
}
.placeBusan{
  position: absolute;
  left: 70%;
  top: 53%;
}
.placeUlsan{
  position: absolute;
  left: 75%;
  top: 45%;
}
.placePohang{
  position: absolute;
  left: 65%;
  top: 40%;
}
.placeDaegu{
  position: absolute;
  left: 55%;
  top: 48%;
}
.placeJeju{
  position: absolute;
  left: 17%;
  top: 92%;
}

</style>
