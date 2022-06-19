<template>
  <div>
    <response-api-info-alert />

    <router-view />

    <scroll-to-top-btn />
  </div>
</template>
<script>
import ScrollToTopBtn from '@/components/ScrollToTopBtn.vue'
import ResponseApiInfoAlert from '@/components/ResponseApiInfoAlert.vue'
import { checkRefreshTokenMixin } from '@/mixins'

export default {
  name: 'DetailForecast',
  components: { ScrollToTopBtn, ResponseApiInfoAlert },
  mixins: [checkRefreshTokenMixin],
  mounted() {
    if (!this.isRefreshTokenSavedAtLocalStorageMixin()) {
      this.$router.push('/')
    }
  },
}
</script>
