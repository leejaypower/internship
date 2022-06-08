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
          :cols="isMobile && 8"
        >
          <v-icon color="pink">
            mdi-map-marker-radius
          </v-icon>
          <span>{{ currentName }}</span>
        </v-col>
        <v-col
          :cols="isMobile && 2"
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
        <v-col
          align="center"
          :cols="isMobile ? 3 : 4"
          :class="{'pl-0 pr-0' : isMobile}"
        >
          <v-chip
            label
            outlined
            color="blue"
          >
            <v-icon>mdi-water</v-icon>
            <span>
              <span v-if="!isMobile">습도</span>
              <span>{{ currentData.humidity }}%</span>
            </span>
          </v-chip>
        </v-col>
        <v-col
          align="center"
          :cols="isMobile ? 6 : 4"
          :class="{'pl-0 pr-0' : isMobile}"
        >
          <v-chip
            label
            outlined
            color="green"
          >
            <v-icon>mdi-windsock</v-icon>
            <span v-if="!isMobile">바람</span>
            <span>(</span>
            <span :style="{transform: windDeg(currentData.wind_deg), margin:'5px'}">⬆</span>
            <span>)</span>
            <span>{{ currentData.wind_speed }}m/s</span>
          </v-chip>
        </v-col>
        <v-col
          align="center"
          :cols="isMobile ? 3 : 4"
          :class="{'pl-0 pr-0' : isMobile}"
        >
          <v-chip
            label
            outlined
            color="red"
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
import { mapGetters } from 'vuex'

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
    onReFetch: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapGetters('user', ['userIdx']),
    ...mapGetters('weather', ['currentName', 'currentCoords']),
    weatherIdDescMap() {
      return this.currentData.weather && weatherIdDescMap[this.currentData.weather[0].id]
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
.empty {
  width: 24px;
}
</style>
