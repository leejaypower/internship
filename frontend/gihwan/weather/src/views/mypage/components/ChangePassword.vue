<template>
  <v-form
    v-model="valid"
    @submit.prevent="onSubmit"
  >
    <v-row justify="center">
      <v-col
        :cols="responsiveInputCols"
        class="text-center"
      >
        <h3>비밀번호 변경</h3>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col :cols="responsiveInputCols">
        <v-text-field
          v-model="currentPw"
          prepend-inner-icon="mdi-key"
          :rules="pwRules"
          type="password"
          label="현재 비밀번호"
          required
          :loading="loading"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col :cols="responsiveInputCols">
        <v-text-field
          v-model="newPw"
          prepend-inner-icon="mdi-key"
          :rules="newPwRules"
          type="password"
          label="변경할 비밀번호"
          required
          :loading="loading"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col :cols="responsiveInputCols">
        <v-text-field
          v-model="newPwConfirm"
          prepend-inner-icon="mdi-key-change"
          :rules="pwCheckRules"
          type="password"
          label="변경할 비밀번호 확인"
          required
          :loading="loading"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        :cols="responsiveInputCols"
        class="text-end"
      >
        <v-btn
          type="submit"
          class="primary"
          :disabled="isPasswordChangeButtonDisabeld"
        >
          비밀번호 변경
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import authMixins from '@/mixins/auth'
import { pwRules, pwCheckRules, newPwRules } from '@/utils/inputRules'
import { changeUserPasswordFetch } from '@/services/api/user'
import { alert } from '@/lib'

export default {
  mixins: [authMixins],
  data: () => ({
    valid: false,
    currentPw: '',
    newPw: '',
    newPwConfirm: '',
    pwRules,
    loading: false,
    constants: {
      USER_PASSWORD_CHANGE_SUCCESS_TITLE: '비밀번호 변경 성공',
      USER_PASSWORD_CHANGE_FAIL_TITLE: '비밀번호 변경 실패',
    },
  }),
  computed: {
    newPwRules() {
      return newPwRules(this.currentPw)
    },
    pwCheckRules() {
      return pwCheckRules(this.newPw)
    },
    isPasswordChangeButtonDisabeld() {
      return !this.valid || this.loading
    },
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true
        const result = await changeUserPasswordFetch({ idx: this.$store.getters['user/userIdx'], currentPw: this.currentPw, newPw: this.newPw })
        alert.success(this.constants.USER_PASSWORD_CHANGE_SUCCESS_TITLE, result)
        this.$store.dispatch('user/logout')
        this.$router.push('/auth')
      } catch (error) {
        alert.error(this.constants.USER_PASSWORD_CHANGE_FAIL_TITLE, error.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>

</style>
