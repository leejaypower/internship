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
      dark
    >
      mdi-arrow-up
    </v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'ScrollToTopBtn',
  data: () => ({
    isBtnShow: false,
  }),
  methods: {
    onScroll() {
      this.$nextTick(() => {
        const top = window.scrollY || 0
        this.isBtnShow = top > 20
      })
    },
    toTop() {
      this.$nextTick(() => {
        this.$vuetify.goTo(0)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.v-btn {
  margin: 20px;
}
</style>
