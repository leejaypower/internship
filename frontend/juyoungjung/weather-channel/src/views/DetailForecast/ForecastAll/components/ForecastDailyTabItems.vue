<template>
  <div>
    <div class="text-center px-3 my-16">
      <h2>요일별 날씨 현황</h2>

      <h5 class="grey--text mt-2 mb-9">
        오늘로부터 7일간의 날씨 예보를 확인하실 수 있습니다.
      </h5>
    </div>

    <v-skeleton-loader
      v-if="!forecastDaily7DaysTemperatureList.length"
      type="image, image, image"
    />

    <v-tabs
      v-else
      v-model="topTabValue"
      hide-slider
      active-class="grey lighten-4"
      color="basil"
      grow
    >
      <v-tab
        v-for="(topTab, i) in topTabs"
        :key="topTab"
        @click="makeTopTabItem(i)"
      >
        {{ topTab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items
      v-model="topTabValue"
    >
      <v-tab-item
        v-for="topTab in topTabs"
        :key="topTab"
      >
        <v-card
          flat
        >
          <v-card-text>
            <v-sparkline
              v-show="!isTopTabValueWind"
              :value="sparklinesConfig.value"
              :gradient="sparklinesConfig.gradient"
              :fill="sparklinesConfig.fill"
              :label-size="responsiveSparklinesLabelSize"
              smooth="5"
              padding="7"
              width="400"
              gradient-direction="top"
              auto-draw
            >
              <template #label="sparkline">
                {{ sparkline.value }}{{ sparklinesConfig.label }}
              </template>
            </v-sparkline>

            <div
              v-show="isTopTabValueWind"
            >
              <wind-card-group
                :is-daily="true"
                :wind-list="windInfo"
              />
            </div>

            <forecast-daily-card-group />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  TEMPERATURE_INDEX,
  RAIN_INDEX,
  WIND_INDEX,
  RED,
  YELLOW,
  GREEN,
  BLUE,
  CELSIUS_UNIT,
} from '@/constants'
import openWeatherMapIconMixin from '@/mixins/openweathermap-icon-mixin'
import WindCardGroup from './WindCardGroup.vue'
import ForecastDailyCardGroup from './ForecastDailyCardGroup.vue'

export default {
  name: 'ForecastDailyTabItems',
  components: { WindCardGroup, ForecastDailyCardGroup },
  mixins: [openWeatherMapIconMixin],
  data: () => ({
    topTabValue: null,
    dayTabValue: null,
    topTabs: ['기온', '강수량', '바람'],
    beforeClickedIndex: 0,
    sparklinesConfig: {
      gradient: [RED, YELLOW, GREEN],
      value: [],
      label: CELSIUS_UNIT,
      fill: true,
    },
    windInfo: null,
  }),
  computed: {
    ...mapGetters('weather', [
      'forecastDaily7DaysTemperatureList',
      'forecastDaily7DaysRainList',
      'forecastDaily7DaysWindList',
    ]),
    isTopTabValueWind() {
      return this.topTabValue === WIND_INDEX
    },
    responsiveSparklinesLabelSize() {
      return this.$vuetify.breakpoint.smAndUp ? 4 : 7
    },
  },
  watch: {
    forecastDaily7DaysTemperatureList(value) {
      this.sparklinesConfig.value = value
    },
  },
  mounted() {
    if (this.sparklinesConfig.value.length === 0 && this.forecastDaily7DaysTemperatureList) {
      this.sparklinesConfig.value = this.forecastDaily7DaysTemperatureList
    }
  },
  methods: {
    makeTopTabItem(topTabIndex) {
      if (this.beforeClickedIndex === topTabIndex) {
        return
      }

      // eslint-disable-next-line default-case
      switch (topTabIndex) {
        case TEMPERATURE_INDEX:
          this.sparklinesConfig = {
            value: this.forecastDaily7DaysTemperatureList,
            label: CELSIUS_UNIT,
            fill: true,
            gradient: [RED, YELLOW, GREEN],
          }
          break

        case RAIN_INDEX:
          this.sparklinesConfig = {
            value: this.forecastDaily7DaysRainList,
            label: '%',
            fill: false,
            gradient: [BLUE],
          }
          break

        case WIND_INDEX:
          this.windInfo = this.forecastDaily7DaysWindList
          break
      }

      this.beforeClickedIndex = topTabIndex
    },
  },
}
</script>
