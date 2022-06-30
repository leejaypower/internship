<template>
  <v-row
    class="template ma-0 rounded-lg"
    align="center"
    dense
  >
    <v-col cols="2">
      <div class="d-flex flex-column align-center justify-center">
        <span>{{ day }}</span>
        <span>{{ date }}</span>
      </div>
    </v-col>
    <v-col cols="6">
      <div class="d-flex align-center flex-shrink-10">
        <v-img
          :src="imageUrl(dailyData)"
          max-height="50"
          max-width="50"
          alt="weather icon"
        />
        <span>
          {{ weatherDesc }}
        </span>
      </div>
    </v-col>
    <v-col cols="2">
      <div class="d-flex align-center">
        <v-icon color="blue">
          mdi-weather-pouring
        </v-icon>
        <span>{{ rainfallProbability }}%</span>
      </div>
    </v-col>
    <v-col cols="2">
      <div>
        <span class="blue--text">{{ minTemp }}°</span>
        <span class="grey--text">/</span>
        <span class="red--text">{{ maxTemp }}°</span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import weatherMixins from '@/mixins/weather'
import { weatherIdDescMap } from '@/utils/mapping'

export default {
  mixins: [weatherMixins],
  props: {
    dailyData: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    dayMap: {
      0: '일',
      1: '월',
      2: '화',
      3: '수',
      4: '목',
      5: '금',
      6: '토',
    },
  }),
  computed: {
    transrateDate() {
      return this.dailyData.dt && new Date(this.dailyData.dt * 1000)
    },
    day() {
      const todayDay = new Date().getDate()
      const compareDay = this.transrateDate?.getDate()
      if (compareDay === todayDay) {
        return '오늘'
      }
      if (compareDay - todayDay === 1) {
        return '내일'
      }
      return `${this.dayMap[this.transrateDate?.getDay()]}`
    },
    date() {
      const month = this.transrateDate && this.transrateDate.getMonth() + 1
      const date = this.transrateDate?.getDate()
      return `${month}.${date}`
    },
    weatherDesc() {
      return this.dailyData.weather && this.weatherIdDesc(this.dailyData?.weather[0].id)
    },
    rainfallProbability() {
      return Math.floor(this.dailyData.pop * 100)
    },
    minTemp() {
      return this.dailyData.temp && Math.floor(this.dailyData.temp.min)
    },
    maxTemp() {
      return this.dailyData.temp && Math.floor(this.dailyData.temp.max)
    },
  },
  methods: {
    weatherIdDesc(id) {
      return weatherIdDescMap[id]
    },
  },
}
</script>

<style scoped>
.template {
  width: 100%;
  border: 1px solid #f1f1f1;
}
</style>
