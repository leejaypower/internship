<template>
  <v-app>
    <toast-message />
    <v-main v-if="isAppLoading">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import mockUserInit from '../mocks/mockUsersInit'
import auth from './service/domain/auth'
import ToastMessage from './ui/components/ToastMessage'

export default {
  name: 'App',
  components: { ToastMessage },
  data() {
    return {
      isAppLoading: false,
    }
  },
  async created() {
    mockUserInit()
    const { accessToken } = auth.getTokens()
    if (accessToken) {
      await this.getUserInfo()
    }
    this.isAppLoading = true
  },
  methods: {
    ...mapActions('auth', ['getUserInfo']),
  },
}
</script>

<style>
#app {
  background: #dbdbdb;
}

#app .v-main {
  width: 600px;
  margin: 0 auto;
  background: white;
  display: flex;
  justify-content: center;
}
</style>
