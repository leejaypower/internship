<template>
  <v-container
    class="pa-0 d-flex justify-center"
    :class="loadingClass"
    :style="{backgroundColor: `${backgroundColor}`}"
    fill-height
  >
    <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    backgroundColor: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters('loading', ['isLoading']),
    loadingClass() {
      return { loading_container: this.isLoading }
    },
  },
}
</script>

<style scoped>
  .loading_container {
    background: #F5F5F5;
  }
</style>
