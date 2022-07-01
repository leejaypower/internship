<template>
  <v-sheet :class="responsiveSheetPaddingMixin">
    <forecast-page-title
      :title="'날씨 진단하기'"
      :sub-title="'현재 지역 날씨정보와 기상청 기후평년값을 비교해 현재 날씨를 진단합니다.'"
    />

    <v-sheet
      :height="responsiveSheetHeight"
    >
      <h1 class="mb-16 text-end">
        {{ today }}
      </h1>

      <div :class="responsiveSheetTitleSize">
        The Weather Channel에서는 기후평년값으로 현재 기온을 진단하고 있습니다.
      </div>

      <v-row class="d-flex justify-center align-center my-10">
        <v-col
          cols="12"
          md="5"
        >
          <compare-current-temperature-with-average
            :set-image-visible="setImageVisible"
            :current-month-climate-average-value="currentMonthClimateAverageValue"
          />
        </v-col>

        <climate-average-info-image
          :is-image-visible="isImageVisible"
        />
      </v-row>
    </v-sheet>

    <v-sheet
      :height="responsiveSheetHeight"
    >
      <div class="text-center">
        <div :class="responsiveSheetTitleSize">
          <p>기후평년값은 현재 기후를 진단하고 미래 기후를 예측하기 위해 만들어졌으며,</p>

          <p>현재 날씨와 기후를 객관적으로 파악하기 위한 기준지표입니다.</p>
        </div>

        <compare-current-weather-with-average
          :current-month-climate-average-value="currentMonthClimateAverageValue"
        />
      </div>
    </v-sheet>

    <v-sheet
      :height="responsiveSheetHeight"
    >
      <div class="fill-height d-flex flex-column justify-center align-center pt-16 text-center">
        <div :class="responsiveSheetTitleSize">
          매일매일 기후행동, 지구를 위한 매일 챌린지에 참여해보세요!
        </div>

        <daily-challenge-for-earth-content />
      </div>
    </v-sheet>

    <v-sheet
      height="300"
      class="mt-16 d-flex justify-center align-center"
    >
      <environmental-organization-slide-group />
    </v-sheet>
  </v-sheet>
</template>
<script>
import dayjs from 'dayjs'
import {
  FORECAST_DIAGONOSE_PC_SHEET_HEIGHT,
  FORECAST_DIAGONOSE_MOBILE_SHEET_HEIGHT,
  PC_TITLE_SIZE,
  MOBILE_TITLE_SIZE,
  FULL_DATE_WITH_DAY_FORMAT,
} from '@/constants'
import { climaticAverageListKorea } from '@/data'
import makeWeatherDataToFixedOne from '@/services/makeWeatherDataToFixedOne'
import { mapGetters } from 'vuex'
import { responsiveSheetMixin } from '@/mixins'
import ForecastPageTitle from '../components/ForecastPageTitle.vue'
import CompareCurrentTemperatureWithAverage from './components/CompareCurrentTemperatureWithAverage.vue'
import CompareCurrentWeatherWithAverage from './components/CompareCurrentWeatherWithAverage.vue'
import EnvironmentalOrganizationSlideGroup from './components/EnvironmentalOrganizationSlideGroup.vue'
import ClimateAverageInfoImage from './components/ClimateAverageInfoImage.vue'
import DailyChallengeForEarthContent from './components/DailyChallengeForEarthContent.vue'

export default
{
  name: 'ForecastDiagonose',
  components: {
    ForecastPageTitle,
    CompareCurrentTemperatureWithAverage,
    CompareCurrentWeatherWithAverage,
    EnvironmentalOrganizationSlideGroup,
    ClimateAverageInfoImage,
    DailyChallengeForEarthContent,
  },
  mixins: [responsiveSheetMixin],
  data: () => ({
    today: dayjs().format(FULL_DATE_WITH_DAY_FORMAT),
    isImageVisible: false,
  }),
  computed: {
    ...mapGetters('weather', [
      'currentLocation',
    ]),
    currentMonthClimateAverageValue() {
      const currentMonthIndex = dayjs().month()
      const currentMonthTotalDays = dayjs().daysInMonth()

      const filterListByCurrentMonth = climaticAverageListKorea[currentMonthIndex]
        .filter((list) => this.currentLocation.includes(list.location))

      if (filterListByCurrentMonth.length === 0) {
        return null
      }

      const averageInfo = filterListByCurrentMonth[filterListByCurrentMonth
        .length - 1]

      const rainAverage = makeWeatherDataToFixedOne(averageInfo.rain / currentMonthTotalDays)

      const {
        temp: average,
        max_temp: max,
        min_temp: min,
        rain: total,
        // eslint-disable-next-line camelcase
        wind_speed,
      } = averageInfo

      return {
        currentMonth: currentMonthIndex + 1,
        temp: {
          average,
          max,
          min,
        },
        wind_speed,
        rain: {
          average: rainAverage,
          total,
        },

      }
    },
    responsiveSheetHeight() {
      return this.$vuetify.breakpoint.mdAndDown
        ? FORECAST_DIAGONOSE_MOBILE_SHEET_HEIGHT : FORECAST_DIAGONOSE_PC_SHEET_HEIGHT
    },
    responsiveSheetTitleSize() {
      return `text-center mb-6 ${this.$vuetify.breakpoint.mdAndDown ? MOBILE_TITLE_SIZE : PC_TITLE_SIZE}`
    },
  },
  methods: {
    setImageVisible() {
      this.isImageVisible = true
    },
  },
}
</script>
