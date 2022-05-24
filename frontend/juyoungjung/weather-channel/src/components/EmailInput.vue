<template>
  <v-text-field
    :value="email"
    :rules="emailRules"
    label="이메일"
    required
    clear-icon="mdi-close-circle"
    clearable
    @input="updateEmail($event)"
    @click:clear="clearEmail"
  />
</template>
<script>
export default {
  name: 'EmailInput',
  props: {
    email: {
      type: String,
      default: '',
    },
  },
  emits: ['onChangeEmail'],
  data: () => ({
    emailRules: [
      (v) => (!!v && !!v?.trim()) || '이메일은 필수 입력값입니다.',
      (v) => {
        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        return emailRegex.test(v) || '이메일 형식에 맞게 작성해주세요.'
      },
    ],
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
