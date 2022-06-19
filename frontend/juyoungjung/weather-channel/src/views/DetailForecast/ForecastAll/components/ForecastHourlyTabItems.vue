<template>
  <div>
    <div class="text-center px-3 my-16">
      <h2>시간별 날씨 현황</h2>
      <h5 class="grey--text mt-2 mb-9">
        현재 시간으로부터 48시간의 날씨 예보를 1시간 간격으로 확인하실 수 있습니다.
      </h5>
    </div>

    <div>
      <v-skeleton-loader
        v-if="!forecastHourlyTemperatureList.length"
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

      <v-tabs
        v-model="dayTabValue"
        grow
        center-active
        slider-color="light-blue"
        slider-size="4"
        height="100"
        class="mb-16"
      >
        <v-tab
          v-for="(tab, i) in forecastHourlyTabList"
          :key="tab"
          @click="makeDayTabItem(i)"
        >
          <h4>
            {{ tab }}
          </h4>
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
              <v-tabs-items v-model="dayTabValue">
                <v-tab-item
                  v-for="tab in forecastHourlyTabList"
                  :key="tab"
                >
                  <v-sparkline
                    v-show="!isTopTabValueWind"
                    :value="sparklinesConfig.value"
                    :gradient="sparklinesConfig.gradient"
                    :fill="sparklinesConfig.fill"
                    :show-labels="responsiveSparklinesShowLabels"
                    smooth="5"
                    padding="7"
                    width="400"
                    label-size="3"
                    gradient-direction="top"
                    auto-draw
                  >
                    <template #label="sparkline">
                      {{ sparkline.value }}{{ sparklinesConfig.label }}
                    </template>
                  </v-sparkline>

                  <div v-show="isTopTabValueWind">
                    <wind-card-group
                      :is-daily="false"
                      :wind-list="windInfo"
                    />
                  </div>
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
/* eslint-disable prefer-destructuring */
import { mapGetters } from 'vuex'
import {
  TEMPERATURE_INDEX,
  RAIN_INDEX,
  WIND_INDEX,
  RED,
  YELLOW,
  GREEN,
  BLUE,
} from '@/constants'
import WindCardGroup from './WindCardGroup.vue'

export default {
  name: 'ForecastHourlyTabItems',
  components: { WindCardGroup },
  data: () => ({
    topTabValue: null,
    dayTabValue: null,
    topTabs: ['기온', '강수량', '바람'],
    beforeClickedIndex: 0,
    sparklinesConfig: {
      gradient: [RED, YELLOW, GREEN],
      value: [],
      label: '°C',
      fill: true,
    },
    windInfo: null,
  }),
  computed: {
    ...mapGetters('weather', [
      'forecastHourlyTabList',
      'forecastHourlyTemperatureList',
      'forecastHourlyRainList',
      'forecastHourlyWindList',
    ]),
    isTopTabValueWind() {
      return this.topTabValue === WIND_INDEX
    },
    responsiveSparklinesShowLabels() {
      return this.$vuetify.breakpoint.smAndUp
    },
  },
  watch: {
    forecastHourlyTemperatureList(value) {
      this.sparklinesConfig.value = value[0]
    },
  },
  mounted() {
    if (this.sparklinesConfig.value.length === 0 && this.forecastHourlyTemperatureList) {
      this.sparklinesConfig.value = this.forecastHourlyTemperatureList[0]
    }
  },
  methods: {
    makeTopTabItem(topTab) {
      // eslint-disable-next-line default-case
      switch (topTab) {
        case TEMPERATURE_INDEX:
          if (!this.sparklinesConfig.fill) {
            this.sparklinesConfig = {
              value: this.forecastHourlyTemperatureList[0],
              label: '°C',
              fill: true,
              gradient: [RED, YELLOW, GREEN],
            }
          }
          break
        case RAIN_INDEX:
          if (this.sparklinesConfig.fill) {
            this.sparklinesConfig = {
              value: this.forecastHourlyRainList[0],
              label: '%',
              fill: false,
              gradient: [BLUE],
            }
          }
          break
        case WIND_INDEX:
          this.windInfo = this.forecastHourlyWindList[0]
          break
      }
    },
    makeDayTabItem(index) {
      const indexTemperatureValue = this.forecastHourlyTemperatureList[index]
      const indexRainValue = this.forecastHourlyRainList[index]
      this.beforeClickedIndex = index

      // eslint-disable-next-line default-case
      switch (this.topTabValue) {
        case TEMPERATURE_INDEX:
          if (this.beforeClickedIndex !== index) {
            this.sparklinesConfig = {
              value: indexTemperatureValue,
              label: '°C',
              fill: true,
              gradient: [RED, YELLOW, GREEN],
            }
          }
          break
        case RAIN_INDEX:
          if (this.beforeClickedIndex !== index) {
            this.sparklinesConfig = {
              value: indexRainValue,
              label: '%',
              fill: false,
              gradient: [BLUE],
            }
          }
          break
        case WIND_INDEX:
          this.windInfo = this.forecastHourlyWindList[index]
          break
      }
    },
  },
}
</script>
