<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        회원가입
      </v-btn>
    </template>
  </v-dialog>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
