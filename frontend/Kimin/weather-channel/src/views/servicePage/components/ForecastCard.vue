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
          {{ '주간예보' }}
        </v-card-title>
        <v-card-subtitle
          class="text-body2 pt-0 pb-0"
        >
          {{ period }}
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
import { mapGetters } from 'vuex'
import Vue from 'vue'
import vueMoment from 'vue-moment'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
)
Vue.use(vueMoment)
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
      period: '',
      showCard: false,
      cardName: '',
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
    ...mapGetters(['getMultiDaysWeather', 'getCurrentWeather']),
  },
  watch: {
    getMultiDaysWeather() {
      this.updateWeathers()
    },
  },
  methods: {
    updateWeathers() {
      this.showCard = true
      this.chartData.labels = this.getMultiDaysWeather.time
      this.chartData.datasets[0].data = this.getMultiDaysWeather.temp
      this.chartData.datasets[0].label = '온도(℃)'
      this.cardName = `온도: ${this.getCurrentWeather.temp}℃`
      this.period = this.showPeriod(this.getMultiDaysWeather.rawTime)
    },
    showPeriod(arr) {
      if (!arr) {
        return null
      }
      const firstDay = Math.min(...arr)
      const lastDay = Math.max(...arr)
      const firstDate = this.$moment(firstDay).format('MM/DD')
      const lastDate = this.$moment(lastDay).format('MM/DD')
      return `${firstDate}~${lastDate}`
    },
  },
}
</script>
