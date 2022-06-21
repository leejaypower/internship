<template>
  <v-container v-if="locationCoord.name">
    <div class="d-flex align-center mb-3">
      <div class="area width mr-1 rounded-lg pa-3 text-center">
        <span class="one-name"> {{ currentName }}</span>
      </div>
      <div class="area width ml-1 rounded-lg pa-3 text-center">
        <span class="two-name"> {{ locationCoord.name }}</span>
      </div>
    </div>
    <HourlyCompareChart
      :one-name="currentName"
      :one-datas="currentHourlyDatas"
      :two-name="locationCoord.name"
      :two-datas="locationData.hourly"
    />
    <DailyCompareChart
      :one-name="currentName"
      :one-datas="currentDailyDatas"
      :two-name="locationCoord.name"
      :two-datas="locationData.daily"
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { HourlyCompareChart, DailyCompareChart } from './components'

export default {
  components: {
    HourlyCompareChart,
    DailyCompareChart,
  },
  computed: {
    ...mapGetters('weather', ['currentName', 'currentData', 'currentDailyDatas', 'currentHourlyDatas', 'locationCoord', 'locationData']),
  },
}
</script>

<style scoped>
.area {
  width: 100%;
  box-shadow: 5px 5px 14px 0px rgba(0,0,0,0.69);
}
.one-name::before {
  content: '●';
  color: #FF5F6D;
}
.two-name::before {
  content: '●';
  color: #FFC371;
}
</style>
