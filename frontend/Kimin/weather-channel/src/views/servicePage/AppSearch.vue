<template>
  <v-card
    width="100%"
    min-width="1000px"
    class="d-flex justify-space-between pa-10"
  >
    <div class="d-flex flex-column left-container">
      <v-btn
        v-show="!showFullTable"
        class="align-self-end"
        width="10vh"
        height="4vh"
        @click="changeView"
      >
        표보기
      </v-btn>
      <div class="d-flex tableContainer">
        <div :class="[ showFullTable ? 'main__tableDiv' : 'main__tableDiv--short' ]">
          <v-data-table
            mobile-breakpoint="0"
            :headers="headers"
            :page.sync="page"
            :items="contents"
            :item-class="isHoveredCity"
            class="city-table"
            @click:row="handleRowClick"
          />
        </div>
        <div
          v-show="!showFullTable"
          class="scoreTableContainer pa-2"
        >
          <RadarChart
            v-if="!isLoading"
            v-show="!showFullTable"
            :city-weather="selectedCityInfo"
          />
        </div>
      </div>
    </div>
    <div class="weather-map">
      <korea-map
        v-show="isNotMobileSize"
        :selected-city-id="selectedCityID"
        :get-cities-weather-info="getCitiesWeatherInfo"
        @markHoveredCity="markHoveredCity"
        @removeHoveredCity="removeHoveredCity"
      />
    </div>
  </v-card>
</template>

<script>
import { KOREA_BIG_CITIES, CITY_TABLE_HEADERS } from '@/constants'
import { mapActions, mapGetters } from 'vuex'
import { CITY_CODE_AND_NAME_MAP, CITY_NAME_AND_CODE_MAP, makeRadarChartData } from '@/services/weather'
import koreaMap from './components/KoreaMap.vue'
import RadarChart from './components/RadarChart.vue'

export default {
  name: 'AppSearch',
  components: {
    koreaMap, RadarChart,
  },
  data() {
    return {
      isLoading: true,
      showFullTable: true,
      selectedCityIndex: 0,
      hoveredCity: null,
      selectedCityID: null,
    }
  },
  computed: {
    ...mapGetters('weatherStore', ['getCitiesWeatherInfo']),
    page: {
      get() {
        const ROW_PER_PAGE = 9
        const page = this.selectedCityIndex > ROW_PER_PAGE ? 2 : 1
        return page
      },
      set(newValue) {
        return newValue
      },
    },
    selectedCityInfo() {
      const weatherInfo = this.getCitiesWeatherInfo[this.selectedCityIndex]
      const dataForRadarChart = makeRadarChartData(weatherInfo)
      return dataForRadarChart
    },
    headers() {
      if (this.showFullTable) {
        return CITY_TABLE_HEADERS
      }
      return CITY_TABLE_HEADERS.filter((header) => header.shortVersion === true)
    },
    contents() {
      return this.getCitiesWeatherInfo
    },
    isNotMobileSize() {
      return this.$vuetify.breakpoint.width > 800
    },
  },
  watch: {
    getCitiesWeatherInfo(value) {
      if (value.length === KOREA_BIG_CITIES.length) {
        this.isLoading = false
      }
    },
  },
  async created() {
    await this.getMultiWeathers(KOREA_BIG_CITIES)
  },
  methods: {
    ...mapActions('weatherStore', ['getMultiWeathers']),
    handleRowClick(value) {
      if (this.isLoading) {
        return
      }

      const cityObj = value
      this.selectedCityIndex = cityObj.index

      this.showFullTable = false

      const cityName = cityObj.name
      const cityID = CITY_NAME_AND_CODE_MAP[cityName]
      this.selectedCityID = cityID // svg 지도의 해당지역에 yellow fill style을 부여하기 위해 활용됩니다.
    },
    markHoveredCity(cityID) {
      if (this.contents.length !== KOREA_BIG_CITIES.length) {
        return
      }

      const hoveredCity = CITY_CODE_AND_NAME_MAP[cityID]
      this.hoveredCity = hoveredCity
      this.selectedCityID = null
      // eslint - disable - next - line
      const hoveredIndex = this.getCitiesWeatherInfo.findIndex((city) => city.name === hoveredCity)
      this.selectedCityIndex = hoveredIndex
      this.showFullTable = false
    },
    removeHoveredCity() {
      this.hoveredCity = null
      this.selectedCityID = null
    },
    changeView() {
      this.showFullTable = !this.showFullTable
      this.selectedNumber = 0
    },
    isHoveredCity(item) {
      return item.name === this.hoveredCity ? 'hoveredCity' : 'normal'
    },
  },
}
</script>

<style>

  .main__tableDiv{
    width: 100%;
  }

  .left-container{
    width: 65%;
  }

  .city-table{
    border-collapse:collapse;
    font-size: 2vh;
  }

  .main__tableDiv--short{
    width: 50%;
    min-width: 200px;
  }

  .city-table tr{
    line-height: 2;
  }

  .city-table th, .city-table td {
    font-size: 0.7vw !important;
    padding: 0.3vw 1vw !important;
    height: 5vh !important;
  }

  .scoreTableContainer{
    width: 100%;
  }

  .tableContainer{
    height:80%;
  }

  .hoveredCity{
    background-color: yellow;
    transition: 400ms;
  }

  .left-container .v-btn span{
    font-size: 1.5vh;
  }

  .left-container .v-data-footer{
    height: 6vh !important;
    line-height: 1.2 !important;
    font-size: 1vw !important;
  }

  .city-table .v-data-footer__select{
    display: none;
  }

  .city-table .v-data-footer{
    justify-content: flex-end;
  }

  .city-table .v-data-footer__pagination{
    margin:0 !important;
  }
</style>
