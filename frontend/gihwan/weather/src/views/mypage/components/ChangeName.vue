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
        <h3>이름 수정</h3>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col :cols="responsiveInputCols">
        <v-text-field
          v-model="name"
          prepend-inner-icon="mdi-badge-account"
          :rules="nameRules"
          required
          :placeholder="userName"
          :error-messages="isError ? errorMessage :''"
          :loading="loading"
          @input="isError = false"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        :cols="responsiveInputCols"
        align="end"
      >
        <v-btn
          type="submit"
          class="primary"
          :disabled="isNameChangeButtonDisabeld"
        >
          이름 수정
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import authMixins from '@/mixins/auth'
import { nameRules } from '@/utils/inputRules'
import { mapGetters } from 'vuex'
import { alert } from '@/lib'

export default {
  mixins: [authMixins],
  data: () => ({
    valid: false,
    name: '',
    nameRules,
    isError: false,
    errorMessage: '변경된 사항이 없습니다.',
    sameNameCheck: false,
    loading: false,
    constants: {
      USER_NAME_CHANGE_SUCCESS_TITLE: '이름 변경 성공',
      USER_NAME_CHANGE_SUCCESS_TEXT: '이름이 정상적으로 변경되었습니다.',
      USER_NAME_CHANGE_FAIL_TITLE: '이름 변경 실패',
    },
  }),
  computed: {
    ...mapGetters('user', ['userIdx', 'userName', 'isChangeNameSuccess', 'changeNameFailMessage']),
    isNameChangeButtonDisabeld() {
      return !this.valid || this.loading || this.name === this.userName
    },
    nameErrorMessages() {
      return this.name === this.userName ? 'asdsad' : ''
    },
  },
  mounted() {
    setTimeout(() => {
      this.name = this.userName
    })
  },
  methods: {
    async onSubmit() {
      this.loading = true
      await this.$store.dispatch('user/changeUserName', { idx: this.userIdx, newName: this.name })
      this.loading = false
      if (!this.isChangeNameSuccess) {
        alert.error(
          this.constants.USER_NAME_CHANGE_FAIL_TITLE,
          this.changeNameFailMessage,
        )
        return
      }
      alert.success(
        this.constants.USER_NAME_CHANGE_SUCCESS_TITLE,
        this.constants.USER_NAME_CHANGE_SUCCESS_TEXT,
      )
    },
  },
}
</script>

<style scoped>

</style>
