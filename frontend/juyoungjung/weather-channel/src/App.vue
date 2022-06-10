<template>
  <v-app class="mx-auto overflow-hidden">
    <app-bar />
    <v-main class="mt-16 pa-10 d-flex justify-center">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue'
import { REFRESHTOKEN, USERINFOLIST } from '@/constants/localStorage-types'
import { mapGetters } from 'vuex'
import { setUserInfoListAtLocalStorage } from '../fakeServer'

export default {
  name: 'App',
  components: { AppBar },
  computed: {
    ...mapGetters('user/', [
      'accessToken',
    ]),
  },
  created() {
    if (!localStorage.getItem(USERINFOLIST)) {
      setUserInfoListAtLocalStorage()
    }
    if (!this.accessToken && localStorage.getItem(REFRESHTOKEN)) {
      this.$store.dispatch('user/renewalAccessTokenInfo')
    }
  },
}
</script>
