<template>
  <div>
    <v-card
      class="mx-auto overflow-hidden"
      height="90vh"
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
                  v-if="!isLoading"
                  :src="storedMyInfo.avatarImgSrc"
                  :alt="storedMyInfo.name"
                >
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <router-link to="/">
              <v-list-item
                @click="logOut"
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
import { mapActions } from 'vuex'

export default {
  name: 'AppHome',
  data() {
    return {
      isLoading: true,
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
    try {
      await this.getMyInfo()
      this.isLoading = false
    } catch (error) {
      const errorCode = (JSON.parse(error.message)).header.HTTPStatusCode
      if (errorCode === '401') {
        this.giveMessage({ text: '로그인정보가 만료되었습니다. 재 로그인 하시기 바랍니다.', color: 'red' })
        this.logOut()
        this.signing = false
      } else {
        this.giveMessage({ text: '서버가 응답할 수 없습니다.', color: 'red' })
        this.signing = false
      }
    }
  },
  methods: {
    ...mapActions([
      'forwardingMyInfo',
      'getMyInfo',
      'logOut',
      'giveMessage',
    ]),
  },
}
</script>

<style scoped>
  a {
    text-decoration-line: none;
  }
</style>
