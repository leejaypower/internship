<template>
  <div
    class="alert-wrapper d-flex flex-wrap"
  >
    <transition-group name="fade">
      <v-alert
        v-for="(alertItem, i) in alert.info"
        :key="alertItem.message + i"
        :v-if="alert.info.length > 0"
        dense
        dark
        :type="alertItem.type"
      >
        {{ alertItem.message }}
      </v-alert>
    </transition-group>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('alertStore')

export default {
  computed: {
    ...mapGetters(['alert']),
    alertInfo() {
      return this.alert.info
    },
  },
  watch: {
    alertInfo() {
      if (this.alert.info.length > 0 && this.alert.add) {
        setTimeout(() => {
          this.$store.dispatch('alertStore/removeAlert')
        }, 2000)
      }
    },
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

.alert-wrapper{
  width: 100vw;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  z-index: 99999 !important;
}

span{
  width:100%;
}

.v-alert{
  width: 100%;
  margin: auto;
}

</style>
