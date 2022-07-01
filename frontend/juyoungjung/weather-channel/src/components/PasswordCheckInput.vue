<template>
  <v-text-field
    :value="passwordCheck"
    :rules="passwordCheckRules"
    :counter="16"
    label="비밀번호 확인하기"
    required
    :append-icon="handlePasswordCheckVisible"
    :type="handlePasswordCheckInputType"
    clear-icon="mdi-close-circle"
    clearable
    @click:append="togglePasswordCheckVisible"
    @click:clear="clearPasswordCheck"
    @input="updatePasswordCheck($event)"
  />
</template>
<script>
import { passwordCheckRules } from '@/services/inputValidation'

export default {
  name: 'PasswordCheckInput',
  props: {
    password: {
      type: String,
      default: '',
    },
    passwordCheck: {
      type: String,
      default: '',
    },
  },
  emits: ['onChangePasswordCheck'],
  data: () => ({
    isPasswordCheckVisible: false,
    passwordCheckRules,
  }),
  computed: {
    handlePasswordCheckVisible() {
      return this.isPasswordCheckVisible ? 'mdi-eye' : 'mdi-eye-off'
    },
    handlePasswordCheckInputType() {
      return this.isPasswordCheckVisible ? 'text' : 'password'
    },
  },
  mounted() {
    if (this.passwordCheckRules.length === 1) {
      this.passwordCheckRules.push((v) => (v === this.password) || '비밀번호가 일치하지 않습니다.')
    }
  },
  methods: {
    togglePasswordCheckVisible() {
      this.isPasswordCheckVisible = !this.isPasswordCheckVisible
    },
    clearPasswordCheck() {
      this.$emit('onChangePasswordCheck', '')
    },
    updatePasswordCheck(newPasswordCheck) {
      this.$emit('onChangePasswordCheck', newPasswordCheck)
    },
  },
}
</script>
