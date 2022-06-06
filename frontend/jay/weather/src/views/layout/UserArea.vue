<template>
  <v-col
    cols="12"
    lg="2"
    md="3"
    sm="10"
    xs="4"
  >
    <v-sheet
      rounded="lg"
      min-height="268"
    >
      <template v-if="isLogin">
        <h2>👋 안녕하세요,</h2>
        <h1>{{ userInfo.name }} 님!</h1>
        <div class="btn-wrap">
          <v-btn
            color="success"
            class="ma-1 btn-style"
            @click="logout"
          >
            로그아웃
          </v-btn>
          <modify-dialog />
          <v-btn
            v-if="checkAdmin"
            color="error"
            text
            @click="makeExpiredAccessToken"
          >
            access 만료
          </v-btn>
          <v-btn
            v-if="checkAdmin"
            color="error"
            text
            @click="makeExpiredRefreshToken"
          >
            refresh 만료
          </v-btn>
        </div>
      </template>
      <template v-else>
        <login-form />
      </template>
    </v-sheet>
  </v-col>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import LoginForm from '@/components/LoginForm.vue'
import ModifyDialog from '@/components/ModifyDialog.vue'
import jwtDecode from 'jwt-decode'

const { mapGetters } = createNamespacedHelpers('userStore')

export default {
  components: { LoginForm, ModifyDialog },
  computed: {
    ...mapGetters(['isLogin']),
    ...mapGetters(['userInfo']),
    checkAdmin() {
      return this.$store.getters['userStore/userInfo'].id === 'admin@test.com'
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('userStore/clearUserInfo')
      localStorage.removeItem('access-token')
      localStorage.removeItem('refresh-token')
      localStorage.removeItem('testRefreshToken')
      localStorage.removeItem('testAccessToken')
      this.$router.push('/').catch(() => {})
    },
    makeExpiredAccessToken() {
      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxIiwiaWQiOiJhZG1pbkB0ZXN0LmNvbSIsIm5hbWUiOiLrp4zro4zrkJwgYWNjZXNzIHRva2Vu7Jy866GcIOq1kOyytCIsInBhc3N3b3JkIjoicXdlcjEyMzQiLCJ0b2tlbk5hbWUiOiJhY2Nlc3MtdG9rZW4ifQ.a422za4wiVQN0e0hwAhLPsOI6LPbEzcegf_v8BIwMLo'
      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbk5hbWUiOiJyZWZyZXNoLXRva2VuIiwiZXhwIjoiOCIsImlkIjoidGVzdG9uZUB0ZXN0LmNvbSIsIm5hbWUiOiLthYzsiqTtirgxIiwicGFzc3dvcmQiOiJxd2VyMTIzNCJ9.ZtQCdacK_upAmzmN0_-Ri6fDQt1OXd_keOCQWn0vjic'
      localStorage.removeItem('testAccessToken')
      localStorage.removeItem('testRefreshToken')
      localStorage.setItem('access-token', accessToken)
      localStorage.setItem('refresh-token', refreshToken)
      this.$store.commit('authStore/SET_TOKEN', jwtDecode(refreshToken))
    },
    makeExpiredRefreshToken() {
      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbk5hbWUiOiJhY2Nlc3MtdG9rZW4iLCJleHAiOiIxIiwiaWQiOiJ0ZXN0dHdvQHRlc3QuY29tIiwibmFtZSI6Iu2FjOyKpO2KuDIiLCJwYXNzd29yZCI6InF3ZXIxMjM0In0.0feZ4LjilhsqYAM4jaThCug1eaegpIVN6gxUNTYSg70'
      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbk5hbWUiOiJhY2Nlc3MtdG9rZW4iLCJleHAiOiIxIiwiaWQiOiJ0ZXN0dHdvQHRlc3QuY29tIiwibmFtZSI6Iu2FjOyKpO2KuDIiLCJwYXNzd29yZCI6InF3ZXIxMjM0In0.0feZ4LjilhsqYAM4jaThCug1eaegpIVN6gxUNTYSg70'
      localStorage.removeItem('testAccessToken')
      localStorage.removeItem('testRefreshToken')
      localStorage.setItem('access-token', accessToken)
      localStorage.setItem('refresh-token', refreshToken)
      this.$store.commit('authStore/SET_TOKEN', jwtDecode(refreshToken))
    },
  },
}
</script>

<style scoped>
h1, h2{
text-align: center;
padding: 20px;
}

.btn-wrap{
  margin-top: 30px;
  text-align: center;
}

.btn-style{
  padding: 5px !important;
  margin-bottom: 20px;
}

</style>
