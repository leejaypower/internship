<template>
  <div class="menu-cover">
    <v-tabs
      fixed-tabs
      slider-color="red"
      :background-color="menuColor"
    >
      <router-link
        v-for="(tab,i) in menus"
        :key="i"
        :to="tab.path"
        class="menu-cover__tab"
      >
        <v-tab class="ml-16 mr-16">
          {{ tab.text }}
        </v-tab>
      </router-link>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: 'AppMenu',
  props: {
    menuCollection: {
      type: Array,
      default: () => ([
      ]),
    },
    menuKimin: {
      type: Boolean,
    },
  },
  data() {
    return {
      sliderLeft: null,
      sliderOpaque: false,
    }
  },
  computed: {
    sliderClass() {
      if (this.sliderOpaque) {
        return 'menu-container__slider--opacity-1'
      }
      return 'menu-container__slider--opacity-0'
    },
    sliderStyle() {
      return {
        width: this.evenPercent,
        left: this.sliderLeft,
      }
    },
    menus() {
      return this.menuCollection
    },
    menuColor() {
      if (this.menuKimin) {
        return 'rgb(79, 228, 79)'
      }
      return 'rgb(0, 166, 255)'
    },
    myPath() {
      const myPath = this.$route.path
      return myPath
    },
    evenPercent: {
      get() {
        const evenWidth = 1 / ((this.menuCollection.length * 2) + 1)
        return `${evenWidth * 100}%`
      },
      set() { // setter가 불필요하지만, 속성을 넣지 않았을 때, 경고가 발생하여 형식을 갖추었음
      },

    },
  },
  watch: {
    myPath() {
      this.sliderOpaque = false
    },
  },
  mounted() {
    this.setEvenWidth()
  },
  methods: {
    selectMenu(i) {
      this.sliderOpaque = true
      const evenPercent = String(this.evenPercent).replace('%', '') * 1
      this.sliderLeft = `${evenPercent * ((2 * i) + 1)}%`
    },
    setEvenWidth() {
      const evenWidth = 1 / ((this.menuCollection.length * 2) + 1)
      this.evenPercent = (evenWidth * 100)
    },
  },
}
</script>

<style scoped>

  .menu-container {
    width: 100%;
    height: 100%;
    transition: 500ms;
  }
  .entire-menu{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    margin: 0;
  }
  .menu-container__slider{
    position: absolute;
    width: 10%;
    height: 5px;
    background-color: red;
    transition: 1s;
    top: 0;
  }
  .menu-container__slider--transparent{
    opacity: 0
  }
  .menu-cover{
    width: 100%;
    height: 100%;
  }
  .menu-item{
    color:black;
    box-sizing: border-box;
    transition: 100ms;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    margin: 0;
    font-size: 2vh;
    width: 100%;
  }

  .menu-container__slider-container{
    position: relative;
    width: 100%;
    height: 1px;
    left: 0;
  }

  .menu-item:hover{
    background-color: rgba(0, 0, 0, 0.2);
  }

  .menu-item:active{
    background-color: rgba(0, 0, 0, 0.4);
  }

  .menu-container__slider--opacity-1{
    opacity:1;
  }
  .menu-container__slider--opacity-0{
    opacity: 0;
  }

  .entire-menu{
    position: relative;
    padding: 0;
  }

  .entire-menu__menu-list{
    display:inline-flex;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    height: 30px;
  }
  .v-tabs-bar__content a {
    text-decoration-line: none;
  }

</style>
