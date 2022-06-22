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
      <p
        v-for="errorItem in errorMessage"
        :key="errorItem"
        class="mt-10"
      >
        {{ errorItem }}
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
    errorMessage() {
      return this.errorInfo.message
    },
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
