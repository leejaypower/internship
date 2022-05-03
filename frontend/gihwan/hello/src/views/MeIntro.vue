<template>
  <div>
    <TheSection
      v-for="{id, title, titleColor, desc, descColor, type, bgColor} in contents"
      :id="title"
      :key="id"
      :title="title"
      :title-color="titleColor"
      :desc="desc"
      :desc-color="descColor"
      :type="type"
      :bg-color="bgColor"
    />
  </div>
</template>

<script>
import { meInfo } from '../data'
import TheSection from '../components/TheSection.vue'

export default {
  components: {
    TheSection,
  },
  computed: {
    contents() {
      return meInfo
    },
  },
}
</script>

<style scoped>

</style>
