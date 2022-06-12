<template>
  <v-row
    v-if="errorInfo.show"
  >
    <v-col
      cols="12"
    >
      <h1 class="header">
        <b>Oops!</b>
      </h1>
      <v-divider />
      <p class="mt-10">
        {{ errorInfo.message }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('alertStore')
export default {
  computed: {
    ...mapGetters(['errorInfo']),
  },
}
</script>

<style scoped>
.header{
  margin-left: 20px;
}

p{
  text-align: center;
}
</style>
