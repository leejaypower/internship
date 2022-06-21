<template>
  <ApexCharts
    type="line"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { CHART_FIRST_COLOR, CHART_SECOND_COLOR } from '@/constants'

export default {
  name: 'HourlyCompareChart',
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
          data: this.getTemps(this.oneDatas),
        },
        {
          name: this.twoName,
          data: this.getTemps(this.twoDatas),
        },
      ]
    },
    categories() {
      let day = '내일'
      return this.oneDatas.map(({ dt: utcData }, i) => {
        const hour = new Date(utcData * 1000).getHours()
        if (i === 0) {
          return `오늘 ${hour}시`
        }
        if (hour === 0) {
          const hourInfo = `${day} ${hour}시`
          day = '모레'
          return hourInfo
        }
        return `${hour}시`
      })
    },
    chartOptions() {
      return {
        colors: [CHART_FIRST_COLOR, CHART_SECOND_COLOR],
        title: {
          text: '시간예보',
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
    getTemps(datas) {
      return datas.map((info) => info.temp)
    },
  },
}
</script>

<style scoped>

</style>
