<template>
  <ApexCharts
    type="bar"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { CHART_FIRST_COLOR, CHART_SECOND_COLOR } from '@/constants'

export default {
  name: 'DailyCompareChart',
  components: {
    ApexCharts: VueApexCharts,
  },
  props: {
    oneName: {
      type: String,
      required: true,
    },
    oneDatas: {
      type: Array,
      required: true,
    },
    twoName: {
      type: String,
      required: true,
    },
    twoDatas: {
      type: Array,
      required: true,
    },
  },
  computed: {
    series() {
      return [
        {
          name: this.oneName,
          data: this.getAvgTemps(this.oneDatas),
        },
        {
          name: this.twoName,
          data: this.getAvgTemps(this.twoDatas),
        },
      ]
    },
    categories() {
      return this.oneDatas.map(({ dt: utcDate }) => {
        const nowDate = new Date().getDate()
        const date = new Date(utcDate * 1000).getDate()
        if (nowDate === date) {
          return '오늘'
        }
        if (date - nowDate === 1) {
          return '내일'
        }
        return `${date}일`
      })
    },
    chartOptions() {
      return {
        colors: [CHART_FIRST_COLOR, CHART_SECOND_COLOR],
        title: {
          text: '주간예보 - 평균 기온',
          align: 'center',
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: this.categories,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
        },
      }
    },
  },
  methods: {
    getAvgTemps(datas) {
      return datas.map((info) => {
        const minTemp = info.temp.min
        const maxTemp = info.temp.max
        return ((maxTemp + minTemp) / 2).toFixed(1)
      })
    },
  },
}
</script>

<style scoped>

</style>
