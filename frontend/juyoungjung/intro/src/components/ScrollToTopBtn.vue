<template>
  <v-btn
    v-show="isBtnShow"
    v-scroll="onScroll"
    fab
    fixed
    bottom
    right
    @click="toTop"
  >
    <v-icon
      large
      dark
    >
      mdi-arrow-up
    </v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'ScrollToTopBtn',
  data() {
    return {
      isBtnShow: false,
    }
  },
  methods: {
    onScroll() {
      this.$nextTick(function cb() {
        const top = window.scrollY || 0
        this.isBtnShow = top > 20
      })
    },
    toTop() {
      this.$nextTick(function cb() {
        this.$vuetify.goTo(0)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.v-btn {
  margin: 24px;
}
</style>
