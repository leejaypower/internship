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
import { nicknameRules } from '@/services/inputValidation'

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
    nicknameRules,
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
