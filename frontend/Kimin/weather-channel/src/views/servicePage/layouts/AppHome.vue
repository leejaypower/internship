<template>
  <v-card
    class="d-flex flex-column justify-start app-home fill-height"
    min-width="1000px"
  >
    <v-app-bar
      color="deep-purple"
      height="50px"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>바로 날씨</v-toolbar-title>
      <v-spacer />
      <span class="pr-5">{{ `안녕하세요  ${storedMyInfo.name}님` }}</span>
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
            <v-avatar
              height="40px"
              width="40px"
            >
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
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/Home/MyInfo">
            <v-list-item
              @click="() => {}"
            >
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>My Info</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list>
      </v-menu>
    </v-app-bar>
    <div class="app-home-contents d-flex fill-height">
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
              v-for="(item,i) in navListItems"
              :key="i"
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
      <router-view />
    </div>
  </v-card>
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
        {
          title: 'testLogging',
          icon: 'mdi-account',
          to: '/Home/testLogging',
        },

      ],
      myInfo: {
        avatarImgSrc: null,
      },
    }
  },
  computed: {
    storedMyInfo() {
      return this.$store.getters['userInfoStore/getStoredMyInfo']
    },
  },
  async created() {
    try {
      await this.getMyInfo()
      this.isLoading = false
    } catch (error) {
      const errorCode = (JSON.parse(error.message)).header.HTTPStatusCode
      if (errorCode === '401') {
        this.alertMessage({ text: '로그인정보가 만료되었습니다. 재 로그인 하시기 바랍니다.', color: 'red' })
        this.logOut()
        this.signing = false
      } else {
        this.alertMessage({ text: '서버가 응답할 수 없습니다.', color: 'red' })
        this.signing = false
      }
    }
  },
  methods: {
    ...mapActions('auth', ['getMyInfo', 'logOut', 'alertMessage']),
  },
}
</script>

<style scoped>
  a {
    text-decoration-line: none;
  }
  .main{
    height: 90%;
  }
</style>
