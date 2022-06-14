<template>
  <v-text-field
    :value="nickname"
    :rules="nicknameRules"
    label="닉네임"
    required
    clear-icon="mdi-close-circle"
    clearable
    :disabled="disabled"
    @input="updateNickname($event)"
    @click:clear="clearNickname"
  />
</template>
<script>
export default {
  name: 'NicknameInput',
  props: {
    nickname: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['onChangeNickname'],
  data: () => ({
    nicknameRules: [
      (v) => (!!v && !!v.trim()) || '닉네임은 필수 입력값입니다.',
      (v) => (v && v.length <= 10) || '닉네임은 10글자 이하로 입력해주세요.',
    ],
  }),
  methods: {
    clearNickname() {
      this.$emit('onChangeNickname', '')
    },
    updateNickname(newNickname) {
      this.$emit('onChangeNickname', newNickname)
    },
  },
}
</script>
