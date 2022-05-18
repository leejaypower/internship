<template>
  <div class="time-box ml-2">
    <div class="time-box__date">
      {{ realTimeCalender }}
    </div>
    <div class="time-box__time">
      {{ realTimeWatch }}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vueMoment from 'vue-moment'

Vue.use(vueMoment)

export default {
  name: 'TimeBox',
  data() {
    return {
      realTimeCalender: this.$moment().format('YYYY / MM / DD'),
      realTimeWatch: this.$moment().format('hh:mm:ss'),
    }
  },
  mounted() {
    setInterval(() => {
      this.realTimeCalender = this.$moment().format('YYYY / MM / DD')
      this.realTimeWatch = this.$moment().format('hh:mm:ss')
    }, 1000)
  },
}
</script>

<style scoped>

  .time-box__date{
    font-size: 7vh;
  }

  .time-box__time{
    font-size: 10vh;
  }

</style>
