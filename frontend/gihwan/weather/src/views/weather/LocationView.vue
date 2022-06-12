<template>
  <v-container>
    <v-row class="mb-5">
      <v-col :cols="cols">
        <v-select
          v-model="si"
          :items="siData"
          label="시"
          hint="시를 선택해 주세요."
          persistent-hint
          @input="onChangeSi"
        />
      </v-col>
      <v-col :cols="cols">
        <v-select
          v-model="gu"
          :items="guData"
          label="구"
          hint="시를 먼저 선택해 주세요."
          persistent-hint
          :disabled="!si"
          @input="onChangeGu"
        />
      </v-col>
    </v-row>
    <template v-if="isShow">
      <CurrentWeather
        :loading="loading"
        :current-data="locationData.current"
        :on-re-fetch="fetchWeatherDataByLocation"
        :title="locationCoord.name"
      />
      <HourWeather
        :loading="loading"
        :hourly-datas="locationData.hourly"
      />
      <DailyWeather
        :loading="loading"
        :daily-datas="locationData.daily"
      />
    </template>
  </v-container>
</template>

<script>
import sigu from '@/../public/sigu.json'
import siguCoords from '@/../public/siguCoords.json'
import { CurrentWeather, DailyWeather, HourWeather } from '@/components/weather'
import { mapGetters, mapActions } from 'vuex'
import weatherMixins from '@/mixins/weather'

export default {
  components: {
    CurrentWeather,
    DailyWeather,
    HourWeather,
  },
  mixins: [weatherMixins],
  data: () => ({
    si: null,
    gu: null,
    siData: Object.keys(sigu),
    coords: null,
    name: null,
    loading: false,
  }),
  computed: {
    ...mapGetters('weather', ['locationCoord', 'locationData']),
    guData() {
      return sigu[this.si]
    },
    isShow() {
      return this.locationData.current
    },
    cols() {
      return this.isMobile ? 6 : 3
    },
  },
  created() {
    if (this.locationCoord) {
      const { name, lat, lon } = this.locationCoord
      this.name = name
      const [si, gu] = name.split(' ')
      this.si = si
      this.gu = gu
      this.coords = { lat, lon }
    }
  },
  methods: {
    ...mapActions('weather', ['locationGetData']),
    onChangeSi() {
      this.gu = null
    },
    async onChangeGu() {
      this.coords = siguCoords[`${this.si}/${this.gu}`]
      this.name = `${this.si} ${this.gu}`
      await this.fetchWeatherDataByLocation()
    },
    async fetchWeatherDataByLocation() {
      this.loading = true
      await this.locationGetData({ coords: this.coords, name: this.name })
      this.loading = false
    },
  },
}
</script>
