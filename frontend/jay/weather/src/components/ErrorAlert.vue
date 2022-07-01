<template>
  <v-row
    v-if="error.show"
  >
    <v-col
      cols="12"
    >
      <h1 class="header">
        <b>Oops!</b>
      </h1>
      <v-divider />
      <p
        v-for="(errorItem,i) in errorMessage"
        :key="errorItem.message + i"
        class="mt-10"
      >
        {{ errorItem.message }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('errorStore')
export default {
  computed: {
    ...mapGetters(['error']),
    errorMessage() {
      return this.error.info
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
