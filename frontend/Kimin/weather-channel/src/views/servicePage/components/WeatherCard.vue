<template>
  <v-card
    class="mt-2 mb-2"
    width="45%"
    height="40%"
  >
    <v-skeleton-loader
      v-if="!showCard"
      class="mx-auto"
      type="card"
    />
    <div
      v-else
      class="d-flex flex-column justify-space-around fill-height"
    >
      <div>
        <v-card-title
          class="text-body pb-2 pt-0"
        >
          {{ cardName }}
        </v-card-title>
        <v-card-subtitle
          class="text-body2 pt-0 pb-0"
        >
          {{ kind }}
        </v-card-subtitle>
      </div>
      <LineChartGenerator
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
      />
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
)
ChartJS.defaults.font.size = 10

export default {
  name: 'WeatherCard',
  components: {
    LineChartGenerator,
  },
  props: {
    kind: {
      type: String,
      default: 'temp',
    },
    chartId: {
      type: String,
      default: 'line-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 120,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      cardName: '',
      showCard: false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartData: {
        labels: '',
        datasets: [
          {
            label: '',
            backgroundColor: '#f87979',
            data: [],
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['getMultiTimeWeather', 'getCurrentWeather']),
  },
  watch: {
    getCurrentWeather() {
      this.updateWeathers()
    },
  },
  methods: {
    updateWeathers() {
      this.showCard = true
      this.chartData.labels = this.getMultiTimeWeather.time
      if (this.kind === 'temp') {
        this.chartData.datasets[0].data = this.getMultiTimeWeather.temp
        this.chartData.datasets[0].label = '온도(℃)'
        this.cardName = `현재온도: ${this.getCurrentWeather.temp}℃`
      } else if (this.kind === 'rainOrSnow') {
        this.chartData.datasets[0].data = this.getMultiTimeWeather.rain
        this.chartData.datasets[0].label = '강수(mm/3h)'
        this.chartData.datasets[0].backgroundColor = 'blue'
        this.chartData.datasets[0].fill = 'true'
        this.cardName = `현재강수: ${this.getCurrentWeather.rainOrSnow.amountOfFall}`
      } else if (this.kind === 'clouds') {
        this.chartData.datasets[0].data = this.getMultiTimeWeather.clouds
        this.chartData.datasets[0].label = '구름량(%)'
        this.chartData.datasets[0].backgroundColor = 'skyblue'
        this.cardName = `현재구름량: ${this.getCurrentWeather.clouds}%`
      }
    },
  },
}
</script>
