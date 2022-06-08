<template>
  <div class="d-flex flex-column justify-center align-center full-height pb-16">
    <v-progress-circular
      class="text-center"
      :rotate="360"
      :size="200"
      :width="15"
      :value="value"
      color="teal"
    >
      어플리케이션 로딩중 : {{ value }}
    </v-progress-circular>
  </div>
</template>
<script>
export default {
  data() {
    return {
      interval: {},
      value: 0,
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        this.value = 0
        return
      }
      this.value += 10
    }, 1000)
  },
}
</script>
