<template>
  <v-container>
    <v-app-bar app>
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.mdAndDown"
        @click="onClickMenuButton"
      />
      <v-toolbar-title>{{ headerTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="isViewSideBar"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            허덕형
          </v-list-item-title>
          <v-list-item-subtitle>
            바로고 FE
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>
<script>

export default {
  data() {
    return {
      isViewSideBar: this.$vuetify.breakpoint.mdAndUp,
      items: [
        { title: '홈', icon: 'mdi-home', to: '/' },
        { title: '기본 정보', icon: 'mdi-account-circle', to: '/my-page' },
        { title: '커리어 정보', icon: 'mdi-briefcase', to: '/my-career' },
      ],
    }
  },
  computed: {
    headerTitle() {
      const currentPageInfo = this.items.find((item) => item.to === this.$route.path)
      const currentPageTitle = currentPageInfo?.title

      return currentPageTitle
    },
  },
  methods: {
    onClickMenuButton() {
      this.isViewSideBar = !this.isViewSideBar
    },
  },
}
</script>
