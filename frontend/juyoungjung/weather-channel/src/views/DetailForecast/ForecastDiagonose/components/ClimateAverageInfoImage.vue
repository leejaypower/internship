<template>
  <transition
    name="fade"
  >
    <v-col
      v-if="isImageVisible"
      class="image-wrapper"
      md="7"
    >
      <img
        width="100%"
        src="@/assets/images/climate-average-info.png"
        alt="climate-average-info"
      >
    </v-col>
  </transition>
</template>
<script>

export default {
  name: 'ClimateAverageInfoImage',
  props: {
    isImageVisible: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>

.image-wrapper{
  opacity:1;
}
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 2s ease-in;
 }

</style>
