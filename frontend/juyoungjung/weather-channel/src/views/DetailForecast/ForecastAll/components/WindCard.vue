<template>
  <v-card
    :height="windCardHeight"
    class="pt-2 d-flex flex-column justify-center align-center"
  >
    <p
      v-if="!isDaily"
      class="pb-2"
    >
      {{ windInfo.hour }}시
    </p>
    <div :style="transformIconRotate(windInfo.wind_deg)">
      <v-icon
        class="text-center"
        color="light-blue"
      >
        mdi-send
      </v-icon>
    </div>
    <span class="pt-4 grey--text text-center">
      속도: {{ inputMeterPerSecondUnit(windInfo.wind_speed) }}
    </span>
    <span class="grey--text text-center">
      돌풍: {{ inputMeterPerSecondUnit(windInfo.wind_gust) }}
    </span>
  </v-card>
</template>
<script>
import { inputMeterPerSecondUnit } from '@/services'

export default {
  name: 'WindCard',
  props: {
    isDaily: {
      type: Boolean,
      default: true,
    },
    windInfo: {
      type: Object,
      default: null,
    },
  },
  computed: {
    windCardHeight() {
      return this.isDaily ? 150 : 180
    },
  },
  methods: {
    transformIconRotate(deg) {
      return `transform:rotate(${deg}deg);`
    },
    inputMeterPerSecondUnit,
  },
}
</script>
