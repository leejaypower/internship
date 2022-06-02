<template>
  <div>
    <v-btn @click="onClickLogout">
      로그아웃 테스트
    </v-btn>
  </div>
</template>

<script>
import auth from '@/service/api/auth'

export default {
  name: 'MainHome',
  computed: {
  },
  created() {
  },
  methods: {
    async onClickLogout() {
      const response = await auth.logout()
      if (response.status === 200) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')

        this.$router.push('/sign-in')
      }
    },
  },
}
</script>

<style>

</style>
