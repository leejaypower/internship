<template>
  <v-container>
    <template v-if="!loading">
      <v-row
        justify="space-between"
        align="center"
        :cols="isMobile && 1"
      >
        <v-spacer is-show="!isMobile" />
        <v-col
          align="center"
          cols="8"
          class="d-flex justify-center align-center"
        >
          <v-icon color="pink">
            mdi-map-marker-radius
          </v-icon>
          <span>{{ title }}</span>
        </v-col>
        <v-col
          cols="2"
          align="end"
        >
          <v-icon @click="onReFetch">
            mdi-refresh
          </v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          align="center"
          class="pa-0"
        >
          <v-img
            :src="imageUrl(currentData)"
            max-height="100"
            max-width="100"
            alt="weather icon"
          />
        </v-col>
        <v-col
          cols="12"
          align="center"
          class="pa-0"
        >
          <h2>{{ currentData.temp }}°</h2>
          <h3>체감 {{ currentData['feels_like'] }}°</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-chip
            label
            outlined
            color="blue"
            :class="chipPaddingObject"
          >
            <v-icon>mdi-water</v-icon>
            <span>
              <span v-if="!isMobile">습도</span>
              <span>{{ currentData.humidity }}%</span>
            </span>
          </v-chip>
        </v-col>
        <v-col align="center">
          <v-chip
            label
            outlined
            color="green"
            :class="chipPaddingObject"
          >
            <v-icon>mdi-windsock</v-icon>
            <span v-if="!isMobile">바람</span>
            <span>(</span>
            <span :style="{transform: windDeg(currentData.wind_deg), margin:'5px'}">⬆</span>
            <span>)</span>
            <span>{{ currentData.wind_speed }}m/s</span>
          </v-chip>
        </v-col>
        <v-col align="center">
          <v-chip
            label
            outlined
            color="red"
            :class="chipPaddingObject"
          >
            <v-icon>mdi-sun-wireless</v-icon><br>
            <span>
              <span v-if="!isMobile">자외선 지수</span>
              <span>{{ currentData.uvi }}</span>
            </span>
          </v-chip>
        </v-col>
      </v-row>
    </template>
    <v-skeleton-loader
      v-else
      type="list-item-two-line, list-item-two-line, actions"
    />
  </v-container>
</template>

<script>
import weatherIdDescMap from '@/utils/weatherIdDescMap'
import weatherMixins from '@/mixins/weather'

export default {
  name: 'CurrentWeatherCard',
  mixins: [weatherMixins],
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    currentData: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    onReFetch: {
      type: Function,
      required: true,
    },
  },
  computed: {
    weatherIdDescMap() {
      return this.currentData.weather && weatherIdDescMap[this.currentData.weather[0].id]
    },
    isBookmarkPage() {
      return this.$route.path.includes('bookmark')
    },
    chipPaddingObject() {
      return {
        'pa-1': !this.isMobile && this.isBookmarkPage,
      }
    },
  },
  methods: {
    windDeg(deg) {
      return `rotate(${deg}deg)`
    },
  },
}
</script>

<style scoped>
.container {
  border-radius: 10px;
  box-shadow: 5px 5px 14px 0px rgba(0,0,0,0.69);
}
</style>
