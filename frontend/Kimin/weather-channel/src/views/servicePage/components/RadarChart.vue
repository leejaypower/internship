<template>
  <div class="fill-height graph-container pt-5">
    <Radar
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
    <div class="pa-1">
      <v-data-table
        :headers="headers"
        :items="contents"
        hide-default-footer
      />
    </div>
  </div>
</template>

<script>
import { RADAR_TABLE_HEADERS } from '@/constants'
import { Radar } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js'

const WILD_WATERMELON = 'rgba(255,99,132,0.5)'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement,
)
export default {
  name: 'RadarChart',
  components: {
    Radar,
  },
  props: {
    cityWeather: {
      type: Object,
      default: () => {},
    },
    chartId: {
      type: String,
      default: 'radar-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 150,
    },
    height: {
      type: Number,
      default: 180,
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
      chartData: {
        labels: [
          '온도',
          '강수',
          '구름',
          '바람',
          '공기질',
        ],
        datasets: [
          {
            label: '',
            borderColor: WILD_WATERMELON,
            data: '',
          },
        ],
      },
      chartOptions: {
        responsive: true,
        scales: {
          r: {
            angleLines: {
              display: false,
            },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
        maintainAspectRatio: false,
      },
    }
  },
  computed: {
    contents() {
      return [
        {
          name: '기준값',
          temp: '20℃',
          clouds: '0%',
          wind: '-',
          air: '매우좋음',
          rainOrSnow: '-',
        },
        {
          name: '발생값',
          temp: `${this.cityWeather.temp}℃`,
          clouds: `${this.cityWeather.clouds}%`,
          wind: `${this.cityWeather.wind}m/s`,
          air: `${this.cityWeather.airDescription}`,
          rainOrSnow: `${this.cityWeather.rainOrSnow.show}`,
        },
        {
          name: '환산점수',
          temp: `${this.cityWeather.score.tempScore}점`,
          clouds: `${this.cityWeather.score.skyScore}점`,
          wind: `${this.cityWeather.score.windScore}점`,
          air: `${this.cityWeather.score.airScore}점`,
          rainOrSnow: `${this.cityWeather.score.rainOrSnowScore}점`,
          score: `${this.cityWeather.score.totalScore}점`,
        },
      ]
    },
    headers() {
      return RADAR_TABLE_HEADERS
    },
  },
  watch: {
    cityWeather(value) {
      const {
        tempScore, rainOrSnowScore, skyScore, windScore, airScore,
      } = value.score

      this.chartData.datasets[0].data = [tempScore, rainOrSnowScore, skyScore, windScore, airScore]
      this.chartData.datasets[0].label = value.name
    },
  },
}
</script>

<style>
.graph-score-table{
    width: 100%;
    height: 80%;
    border-collapse: collapse;
    text-align: center;
  }
  td{
    border-top: 1px solid rgb(212, 209, 209);
    border-bottom: 1px solid rgb(210, 208, 208);
  }
.graph-container{
  width: 100%;
}
.finalScore {
  background-color: yellow;
}
.graph-container .v-data-table td,th {
  font-size: 1.5vh !important;
  padding: 1vh 2vh !important;
  height: 3.5vh !important;
}
</style>
