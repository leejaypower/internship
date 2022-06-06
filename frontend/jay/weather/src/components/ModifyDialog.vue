<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    max-width="600px"
    persistent
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        class="btn-padding"
        v-on="on"
      >
        내 정보 수정
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">내 정보 수정</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="user.password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-2"
                  class="input-group--focused"
                  color="teal"
                  label="현재 비밀번호"
                  :rules="registerPasswordRules"
                  persistent-hint
                  required
                  clearable
                  @click:append="show1 = !show1"
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="user.changedPassword"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-2"
                  class="input-group--focused"
                  color="teal"
                  label="비밀번호 변경"
                  :rules="registerPasswordRules"
                  persistent-hint
                  required
                  clearable
                  @click:append="show2 = !show2"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="confirmedPassword"
                  color="teal"
                  label="비밀번호 확인"
                  :rules="getConfirmPasswordRules(user.changedPassword)"
                  type="password"
                  required
                  clearable
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="tryClose()"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          :disabled="hasAnyEmptyInput"
          class="mr-4"
          @click="submitForm(user.changedPassword)"
        >
          수정하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  registerPasswordRules, getConfirmPasswordRules,
} from '@/util/formRules'

import { createNamespacedHelpers } from 'vuex'
import DialogMixin from '@/mixins/FormDialog'

const { mapGetters } = createNamespacedHelpers('alertStore')

export default {
  mixins: [DialogMixin],
  data: () => ({
    dialog: false,
    valid: false,
    show1: false,
    show2: false,
    register: false,
    chekedId: '',
    user: {
      password: '',
      changedPassword: '',
    },
    confirmedPassword: '',
    registerPasswordRules,
    getConfirmPasswordRules,
  }),
  computed: {
    ...mapGetters(['sheetInfo']),
    hasAnyEmptyInput() {
      return !this.user.password || !this.user.changedPassword || !this.confirmedPassword
    },
    hasAnyValueInput() {
      return this.user.password || this.user.changedPassword || this.confirmedPassword
    },
  },
  methods: {
    async submitForm(changedPassword) {
      this.$refs.form.validate()
      if (!this.valid) {
        return
      }
      const user = this.$store.getters['userStore/userInfo']
      const { id } = user // 현재 로그인되어 있는 아이디
      const { password } = this.user // 수정을 위해 필요한 현재 비밀번호
      const checkResult = await this.$store.dispatch('userStore/checkPassword', { id, password })
      if (checkResult === id) {
        if (this.user.password === this.user.changedPassword) {
          this.$store.dispatch('alertStore/setAlertInfo', {
            type: 'warning',
            message: '비밀번호가 변경되지 않았습니다!',
          })
          this.$store.dispatch('alertStore/removeAlert')
          return
        }
        const response = await this.$store.dispatch('userStore/modifyPassword', { id, changedPassword })
        if (response === id) {
          this.register = true
        }
      }
      this.closeDialog()
    },

  },
}
</script>

<style scoped>
.btn-padding{
  padding: 3px !important;
}
</style>
