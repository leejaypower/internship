<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'ForecastDetail',
  created() {
    if (this.$route.path === '/forecast-detail') {
      this.$router.replace('/one-week-forecast')
    }
  },
}
</script>

<style>

</style>
