<template>
  <div>
    홈페이지
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StoreModuleNames from '@/constants/storeModuleNames'

export default {
  computed: {
    ...mapGetters(StoreModuleNames.Auth, ['token']),
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
