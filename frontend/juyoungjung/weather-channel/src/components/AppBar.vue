<template>
  <div>
    <v-app-bar
      absolute
      height="80"
    >
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.smAndDown"
        @click="toggleDrawerVisible"
      />
      <v-toolbar-title>The Weather Channel</v-toolbar-title>
      <v-spacer />
      <v-btn-toggle
        v-for="item in appBarMenuItems"
        v-show="!$vuetify.breakpoint.smAndDown"
        :key="item.icon"
        v-model="clickedMenuName"
        active-class="grey lighten-5"
        group
      >
        <v-toolbar-title>
          <router-link :to="`${item.to}`">
            <v-btn
              height="70"
              elevation="0"
              :value="item.text"
            >
              <div class="d-flex flex-column">
                <auth-type-chip
                  :text="item.text"
                  :required-auth="item.requiredAuth"
                />
              </div>
            </v-btn>
          </router-link>
        </v-toolbar-title>
      </v-btn-toggle>
      <v-spacer />
      <v-toolbar-title class="mr-2">
        <dropdown-menu />
      </v-toolbar-title>
    </v-app-bar>
    <navigation-drawer
      :is-drawer-visible="isDrawerVisible"
      @onChangeIsDrawerVisible="toggleDrawerVisible"
    />
  </div>
</template>
<script>
import appBarMenuItems from '@/data/AppBarMenuItems'
import NavigationDrawer from './NavigationDrawer.vue'
import AuthTypeChip from './AuthTypeChip.vue'
import DropdownMenu from './DropdownMenu.vue'

export default {
  name: 'AppBar',
  components: {
    NavigationDrawer,
    AuthTypeChip,
    DropdownMenu,
  },
  data: () => ({
    clickedMenuName: '',
    isDrawerVisible: false,
    appBarMenuItems,
  }),
  methods: {
    toggleDrawerVisible() {
      this.isDrawerVisible = !this.isDrawerVisible
    },
  },
}
</script>
<style lang="scss" scoped>
.center-toolbar-title-wrapper {
  width: 500px;
  display: flex;
  justify-content: space-between;
}
</style>
