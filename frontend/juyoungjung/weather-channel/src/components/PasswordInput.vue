<template>
  <v-text-field
    :value="password"
    :rules="passwordRules"
    :counter="16"
    :label="label"
    required
    :hint="isSignUp"
    :append-icon="handlePasswordVisible"
    :type="handlePasswordInputType"
    clear-icon="mdi-close-circle"
    clearable
    @click:append="togglePasswordVisible"
    @click:clear="clearPassword"
    @input="updatePassword($event)"
  />
</template>
<script>
import { passwordRules } from '@/services/inputValidation'

export default {
  name: 'PasswordInput',
  props: {
    password: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '비밀번호',
    },
  },
  emits: ['onChangePassword'],
  data: () => ({
    isPasswordVisible: false,
    passwordRules,
  }),
  computed: {
    handlePasswordVisible() {
      return this.isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'
    },
    handlePasswordInputType() {
      return this.isPasswordVisible ? 'text' : 'password'
    },
    isSignUp() {
      return this.$route.path === '/signup' ? '비밀번호는 4글자 이상 16글자 이하로 입력해주세요.' : ''
    },
  },
  methods: {
    togglePasswordVisible() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
    clearPassword() {
      this.$emit('onChangePassword', '')
    },
    updatePassword(newPassword) {
      this.$emit('onChangePassword', newPassword)
    },
  },
}
</script>
