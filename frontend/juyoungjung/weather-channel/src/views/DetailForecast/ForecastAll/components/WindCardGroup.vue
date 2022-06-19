<template>
  <v-row
    class="mx-5 d-flex flex-row justify-center align-center"
    no-gutters
  >
    <v-col
      v-for="data in windList"
      :key="data.key"
      :cols="windCardCols"
    >
      <wind-card
        :is-daily="isDaily"
        :wind-info="data"
      />
    </v-col>
  </v-row>
</template>
<script>
import WindCard from './WindCard.vue'

export default {
  name: 'WindCardGroup',
  components: { WindCard },
  props: {
    windList: {
      type: Array,
      default: () => [],
    },
    isDaily: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    windCardCols() {
      if (this.isDaily) {
        return this.$vuetify.breakpoint.smAndDown ? 12 : 0
      }
      return this.$vuetify.breakpoint.smAndDown ? 12 : 1
    },
  },
}
</script>
