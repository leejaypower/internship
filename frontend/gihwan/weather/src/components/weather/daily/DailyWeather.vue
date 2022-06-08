<template>
  <div>
    <h3>주간예보</h3>
    <v-row v-if="!loading">
      <v-col
        v-for="dailyData in dailyDatas"
        :key="dailyData.i"
        class="d-flex align-center"
        :cols="cols"
      >
        <DailyWeatherItem :daily-data="dailyData" />
      </v-col>
    </v-row>
    <v-skeleton-loader
      v-for="num in skeletonCount"
      v-else
      :key="num"
      type="list-item-two-line"
    />
  </div>
</template>

<script>
import DailyWeatherItem from '@/components/weather/daily/DailyWeatherItem.vue'
import weatherMixins from '@/mixins/weather'

export default {
  components: {
    DailyWeatherItem,
  },
  mixins: [weatherMixins],
  props: {
    dailyDatas: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    skeletonCount: 4,
  }),
}
</script>
