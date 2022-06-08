<template>
  <v-app>
    <toast-message />
    <app-loading v-if="isAppLoading" />
    <v-main v-else>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import AppLoading from '@/ui/components/AppLoading'
import mockUserInit from '../mocks/mockUsersInit'
import auth from './service/domain/auth'
import ToastMessage from './ui/components/ToastMessage'

export default {
  name: 'App',
  components: { AppLoading, ToastMessage },
  data() {
    return {
      isAppLoading: true,
    }
  },
  async created() {
    mockUserInit()
    const { accessToken } = auth.getTokens()
    if (accessToken) {
      await this.getUserInfo()
    }
    this.isAppLoading = false
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

.full-height {
  height: 100%;
}
</style>
