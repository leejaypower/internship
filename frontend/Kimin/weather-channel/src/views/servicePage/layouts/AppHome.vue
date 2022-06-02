<template>
  <div>
    <v-card
      class="mx-auto overflow-hidden"
      height="100vh"
    >
      <v-app-bar
        color="deep-purple"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = !drawer" />

        <v-toolbar-title>바로 날씨</v-toolbar-title>
        <v-spacer />
        <v-menu
          left
          bottom
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-avatar>
                <img
                  :src="storedMyInfo.avatarImgSrc"
                  :alt="storedMyInfo.name"
                >
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <router-link to="/">
              <v-list-item
                @click="logout"
              >
                <v-list-item-icon>
                  <v-icon>{{ 'mdi-logout' }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>로그아웃</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/Home/MyInfo">
              <v-list-item
                @click="() => {}"
              >
                <v-list-item-icon>
                  <v-icon>{{ 'mdi-account' }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>My Info</v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <router-link
              v-for="item in navListItems"
              :key="item.text"
              :to="item.to"
            >
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-container class="d-flex justify-center fill-height align-start">
        <router-view />
      </v-container>
    </v-card>
  </div>
</template>

<script>
import logOut from '@/services/auth/logOut'
import { mapActions } from 'vuex'

export default {
  name: 'AppHome',
  data() {
    return {
      drawer: false,
      group: null,
      navListItems: [
        {
          title: 'Dashboard',
          icon: 'mdi-home',
          to: '/Home/Dashboard',
        },
        {
          title: 'Search',
          icon: 'mdi-account',
          to: '/Home/Search',
        },
      ],
      myInfo: {
        avatarImgSrc: null,
      },
    }
  },
  computed: {
    storedMyInfo() {
      return this.$store.getters.getMyInfo
    },
  },
  async created() {
    await this.requestVerifyingToken()
    const myInfo = await this.getMyInfo()
    await this.forwardingMyInfo(myInfo)
  },
  methods: {
    ...mapActions([
      'requestVerifyingToken', 'forwardingMyInfo', 'getMyInfo',
    ]),
    logout() {
      logOut()
    },
  },
}
</script>

<style scoped>
  a {
    text-decoration-line: none;
  }
</style>
