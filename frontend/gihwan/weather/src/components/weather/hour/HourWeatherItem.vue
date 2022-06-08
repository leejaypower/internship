<template>
  <div class="d-flex flex-column align-center pl-3 pr-3 ab">
    <span>{{ (hourlyData.temp).toFixed(1) }}°</span>
    <v-img
      :src="imageUrl(hourlyData)"
      max-height="50"
      max-width="50"
      alt="weather icon"
    />
    <span class="text-caption">{{ date }}</span>
  </div>
</template>

<script>
import weatherMixins from '@/mixins/weather'

export default {
  mixins: [weatherMixins],
  props: {
    hourlyData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    date() {
      const todayDay = new Date().getDate()
      const compareDay = this.hourlyData.dt && new Date(this.hourlyData.dt * 1000).getDate()
      const hour = this.hourlyData.dt && new Date(this.hourlyData.dt * 1000).getHours()
      if (compareDay - todayDay === 1) {
        return `내일 ${hour}시`
      }
      if (compareDay - todayDay === 2) {
        return `모레 ${hour}시`
      }
      if (compareDay - todayDay === 3) {
        return `글피 ${hour}시`
      }
      return `오늘 ${hour}시`
    },
  },
}
</script>

<style scoped>
.ab {
  border-right: 1px solid #f1f1f1;
}
</style>
