<template>
  <div>
    <weather-api-response-alert />

    <router-view />

    <scroll-to-top-btn />
  </div>
</template>
<script>
import ScrollToTopBtn from '@/components/ScrollToTopBtn.vue'
import WeatherApiResponseAlert from '@/components/WeatherApiResponseAlert.vue'
import { checkRefreshTokenMixin } from '@/mixins'

export default {
  name: 'DetailForecast',
  components: { ScrollToTopBtn, WeatherApiResponseAlert },
  mixins: [checkRefreshTokenMixin],
  mounted() {
    if (!this.isRefreshTokenSavedAtLocalStorageMixin()) {
      this.$router.push('/')
    }
  },
}
</script>
