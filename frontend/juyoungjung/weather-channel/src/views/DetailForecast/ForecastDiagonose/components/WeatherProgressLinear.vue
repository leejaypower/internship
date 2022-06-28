<template>
  <div class="mt-2">
    <h3 class="text-start">
      {{ title }}
    </h3>
    <v-progress-linear
      :value="weatherData"
      :color="color"
      height="40"
      query
    >
      <template #default="{ value }">
        <strong>{{ value }}{{ unit }}</strong>
      </template>
    </v-progress-linear>
  </div>
</template>
<script>
import { CELSIUS_UNIT } from '@/constants'

export default {
  name: 'WeatherProgressLinear',
  props: {
    title: {
      type: String,
      default: '',
    },
    weatherData: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '',
    },
    unit: {
      type: String,
      default: CELSIUS_UNIT,
    },
  },
}
</script>
