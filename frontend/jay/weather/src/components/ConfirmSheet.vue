<template>
  <div class="text-center">
    <v-bottom-sheet
      v-model="sheetInfo.show"
      inset
    >
      <v-sheet
        class="text-center"
        height="200px"
      >
        <v-btn
          class="mt-6"
          text
          color="error"
          @click="confirm()"
        >
          확인
        </v-btn>

        <div class="my-3">
          {{ sheetInfo.message }}
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('alertStore')

export default {
  computed: {
    ...mapGetters(['sheetInfo']),
  },
  methods: {
    confirm() {
      this.$store.dispatch('alertStore/setAgree')
    },
  },
}
</script>
