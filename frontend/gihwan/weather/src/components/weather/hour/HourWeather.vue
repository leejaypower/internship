<template>
  <div class="mt-5 mb-5">
    <h3 class="mb-2">
      시간예보
    </h3>
    <div class="d-flex overflow-auto">
      <template v-if="!loading">
        <HourWeatherItem
          v-for="hourlyData in hourlyDatas"
          :key="hourlyData.dt"
          :hourly-data="hourlyData"
        />
      </template>
      <div
        v-else
        class="d-flex overflow-auto"
      >
        <v-skeleton-loader
          v-for="i in 30"
          :key="i"
          class="overflow-visible"
          type="avatar"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HourWeatherItem from '@/components/weather/hour/HourWeatherItem.vue'

export default {
  components: {
    HourWeatherItem,
  },
  props: {
    hourlyDatas: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
