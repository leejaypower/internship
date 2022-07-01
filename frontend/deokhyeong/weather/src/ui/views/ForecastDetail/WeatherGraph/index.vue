<template>
  <div>
    <line-chart-generator
      :chart-options="chartOptions"
      :chart-data="temperatureData"
      chart-id="line-chart"
      :width="400"
      :height="400"
      css-classes="weather-chart-generator"
    />
    <line-chart-generator
      :chart-options="chartOptions"
      :chart-data="windData"
      chart-id="line-chart"
      :width="400"
      :height="400"
      css-classes="weather-chart-generator"
    />
  </div>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import { mapGetters } from 'vuex'

import {
  Chart,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from 'chart.js'

Chart.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
)

export default {
  name: 'WeatherGraph',
  components: {
    LineChartGenerator,
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  computed: {
    ...mapGetters('weather', ['hourlyWeathers']),
    weatherItems() {
      return this.hourlyWeathers.filter(
        (weather) => weather.date === this.$route.params.date,
      )
    },
    hours() {
      return this.weatherItems.map((weather) => weather.hour)
    },
    temperatureData() {
      const temperatures = this.weatherItems.map((weather) => weather.temperature)
      const pointImgs = this.weatherItems.map(this.getTemperaturePointImg)

      return {
        labels: this.hours,
        datasets: [
          {
            label: '온도 (°C)',
            backgroundColor: '#FFB74D',
            borderColor: '#FFB74D',
            data: temperatures,
            pointStyle: pointImgs,
          },
        ],
      }
    },
    windData() {
      const windSpeeds = this.weatherItems.map((weather) => weather.windSpeed)

      return {
        labels: this.hours,
        datasets: [
          {
            label: '풍속 (m/s)',
            backgroundColor: '#90CAF9',
            borderColor: '#90CAF9',
            pointBackgroundColor: '#1A237E',
            data: windSpeeds,
          },
        ],
      }
    },
  },
  methods: {
    getTemperaturePointImg(weather) {
      const image = document.createElement('img')
      image.src = weather.weatherIcon
      image.alt = '날씨 아이콘'
      image.height = 24
      image.width = 24

      return image
    },
  },
}
</script>

<style scoped>
.weather-chart-generator{
  background: white;
}
</style>
