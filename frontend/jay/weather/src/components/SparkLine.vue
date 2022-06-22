<template>
  <v-card
    outlined
    class="grey lighten-5"
  >
    <div class="d-flex justify-space-between sparkline-time pa-2">
      <p>07시</p>
      <p>12시</p>
      <p>18시</p>
      <p>21시</p>
    </div>
    <div class="d-flex justify-space-between sparkline-divider pa-4">
      <v-divider vertical />
      <v-divider vertical />
      <v-divider vertical />
      <v-divider vertical />
    </div>
    <v-divider vertical />
    <v-sparkline
      :labels="dailyWeather.hourlyTemp"
      :value="dailyWeather.hourlyTemp"
      :gradient="sparkline.gradient"
      :padding="8"
      :line-width="2"
      :gradient-direction="sparkline.top"
    />
  </v-card>
</template>

<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]
export default {
  props: {
    dailyWeather: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    sparkline:
    {
      lineCap: 'round',
      gradient: gradients[5],
      gradientDirection: 'top',
    },
  }),
}
</script>

<style scoped>
.sparkline-divider{
  position: absolute;
  width:100%;
  height:75%;
  z-index: 100;
}

.sparkline-time > p{
  font-weight: bolder;
  color: gray
}

</style>
