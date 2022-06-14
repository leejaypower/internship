<template>
  <div>
    <response-error-info-alert />

    <router-view />

    <scroll-to-top-btn />
  </div>
</template>
<script>
import ScrollToTopBtn from '@/components/ScrollToTopBtn.vue'
import ResponseErrorInfoAlert from '@/components/ResponseErrorInfoAlert.vue'
import { checkRefreshTokenMixin } from '@/mixins'

export default {
  name: 'DetailForecast',
  components: { ResponseErrorInfoAlert, ScrollToTopBtn },
  mixins: [checkRefreshTokenMixin],
  mounted() {
    if (!this.$_isRefreshTokenSavedAtLocalStorage()) {
      this.$router.push('/')
    }
  },
}
</script>
