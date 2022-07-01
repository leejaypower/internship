<template>
  <v-text-field
    :value="email"
    :rules="emailRules"
    label="이메일"
    required
    clear-icon="mdi-close-circle"
    clearable
    :disabled="disabled"
    @input="updateEmail($event)"
    @click:clear="clearEmail"
  />
</template>
<script>
import { emailRules } from '@/services/inputValidation'

export default {
  name: 'EmailInput',
  props: {
    email: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['onChangeEmail'],
  data: () => ({
    emailRules,
  }),
  methods: {
    clearEmail() {
      this.$emit('onChangeEmail', '')
    },
    updateEmail(newEmail) {
      this.$emit('onChangeEmail', newEmail)
    },
  },
}
</script>
