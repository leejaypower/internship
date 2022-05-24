<template>
  <div class="d-flex align-center justify-center pb-12">
    <img
      :src="src"
      :height="height"
      alt="로고사진"
      contain
      :position="position"
    >
    <span class="text-h6">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '/',
      required: true,
    },
    height: {
      type: Number,
      default: 0,
      required: true,
    },
    position: {
      type: String,
      default: '',
      required: true,
    },
    title: {
      type: String,
      default: '',
      required: true,
    },
  },
}
</script>

<style>

</style>
