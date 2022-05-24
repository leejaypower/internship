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
    :error="passwordCheckError"
    @click:append="togglePasswordCheckVisible"
    @click:clear="clearPasswordCheck"
    @input="updatePasswordCheck($event)"
  />
</template>
<script>
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
    passwordCheckError: {
      type: Boolean,
      default: false,
    },
    resetPasswordCheckError: {
      type: Function,
      default: () => {
        this.$emit('resetPasswordCheckError')
      },
    },
  },
  emits: ['onChangePasswordCheck'],
  data: () => ({
    isPasswordCheckVisible: true,
    passwordCheckRules: [
      (v) => (!!v && !!v?.trim()) || '비밀번호 확인하기는 필수 입력값입니다.',
    ],
  }),
  computed: {
    handlePasswordCheckVisible() {
      return this.isPasswordCheckVisible ? 'mdi-eye' : 'mdi-eye-off'
    },
    handlePasswordCheckInputType() {
      return this.isPasswordCheckVisible ? 'text' : 'current-password'
    },
  },
  mounted() {
    this.passwordCheckRules.push((v) => (v === this.password) || '비밀번호가 일치하지 않습니다.')
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
      this.resetPasswordCheckError()
    },
  },
}
</script>
