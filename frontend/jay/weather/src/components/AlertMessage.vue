<template>
  <transition name="fade">
    <v-alert
      v-if="getAlertInfo.show"
      dense
      dark
      :type="getAlertInfo.type"
    >
      {{ getAlertInfo.message }}
    </v-alert>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('alertStore')

export default {
  computed: {
    ...mapGetters(['getAlertInfo']),
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

.v-alert{
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  z-index: 99999 !important;
}
</style>
