<template>
  <v-text-field
    :value="password"
    :rules="passwordRules"
    :counter="16"
    label="비밀번호"
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
export default {
  name: 'PasswordInput',
  props: {
    password: {
      type: String,
      default: '',
    },
  },
  emits: ['onChangePassword'],
  data: () => ({
    isPasswordVisible: true,
    passwordRules: [
      (v) => (!!v && !!v?.trim()) || '비밀번호는 필수 입력값입니다.',
      (v) => (v && v.length >= 4 && v.length <= 16) || '비밀번호는 4글자 이상 16글자 이하로 입력해주세요.',
    ],
  }),
  computed: {
    handlePasswordVisible() {
      return this.isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'
    },
    handlePasswordInputType() {
      return this.isPasswordVisible ? 'text' : 'current-password'
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
