<template>
  <v-col
    cols="12"
    lg="8"
    md="7"
    sm="10"
  >
    <v-sheet
      min-height="70vh"
      rounded="lg"
    >
      <router-view />
    </v-sheet>
  </v-col>
</template>

<script>
export default {

}
</script>

<style scoped>
.v-sheet{
  overflow: scroll
}
</style>
