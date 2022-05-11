<template>
  <div class="contents-body">
    <div class="second-line">
      <app-menu
        :menu-collection="fowardingMenu"
        :menu-kimin="menuKimin"
      />
    </div>
    <router-view />
  </div>
</template>

<script>
import AppMenu from './AppMenu.vue'

export default {
  name: 'SecondLine',
  components: {
    AppMenu,
  },
  data() {
    return {
      personalMenu: [
        { text: '취향', path: '/Kimin/Taste', status: false },
        { text: '가족', path: '/Kimin/Family', status: false },
      ],
      companyMenu: [
        { text: '역사', path: '/Barogo/History', status: false },
        { text: '시장', path: '/Barogo/Market', status: false },
        { text: '대표', path: '/Barogo/CEO', status: false },
      ],
      menuKimin: true,

    }
  },
  computed: {
    fowardingMenu() {
      if (this.menuKimin) {
        return this.personalMenu
      }
      return this.companyMenu
    },
  },
  mounted() {
    this.updateMenu()
  },
  updated() {
    this.updateMenu()
  },
  methods: {
    updateMenu() {
      if (this.$route.path.indexOf('Kimin') !== -1) {
        this.menuKimin = true
      } else {
        this.menuKimin = false
      }
      return [
        { text: '역사', path: '/Barogo/History', status: false },
        { text: '시장', path: '/Barogo/Market', status: false },
        { text: '대표', path: '/Barogo/CEO', status: false },
      ]
    },
  },
}
</script>

<style scoped>

  .firstMenuCover:nth-child(1){
    border-radius: 0 50px 0 0;
  }

  .firstMenuCover:nth-child(2){
    border-radius: 50px 0 0 0;
  }

  .second-line{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 5vh;
  }

  .contents-body {
    height: 100%;
  }

</style>
