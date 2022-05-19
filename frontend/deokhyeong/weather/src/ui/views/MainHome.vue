<template>
  <div>
    홈페이지
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('authStore', ['token']),
  },
  created() {
    if (!this.token) {
      this.$router.replace('/sign-in')
    }
  },
}
</script>

<style>

</style>
