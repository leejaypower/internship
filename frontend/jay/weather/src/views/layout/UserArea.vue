<template>
  <v-col
    cols="12"
    sm="2"
  >
    <v-sheet
      rounded="lg"
      min-height="268"
    >
      <login-form />
      <register-dialog />
    </v-sheet>
  </v-col>
</template>

<script>
import RegisterDialog from '@/components/RegisterDialog.vue'
import LoginForm from '@/components/LoginForm.vue'

export default {
  components: { LoginForm, RegisterDialog },
}
</script>
