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
        <h1>{{ getUserInfo.name }} 님!</h1>
        <div class="btn-wrap">
          <v-btn
            color="success"
            class="ma-1 btn-style"
            @click="logout"
          >
            로그아웃
          </v-btn>
          <v-btn
            color="primary"
            class="ma-1 btn-style"
          >
            내 정보 수정
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

const { mapGetters } = createNamespacedHelpers('userStore')

export default {
  components: { LoginForm },
  computed: {
    ...mapGetters(['isLogin']),
    ...mapGetters(['getUserInfo']),
  },
  methods: {
    logout() {
      this.$store.dispatch('userStore/clearUserInfo')
      this.$router.push('/').catch(() => {})
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
