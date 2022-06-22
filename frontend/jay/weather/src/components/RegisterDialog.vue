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
        회원가입
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">회원 가입</span>
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
                  v-model="user.name"
                  color="teal"
                  :rules="registerNameRules"
                  label="이름"
                  required
                  clearable
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  ref="idform"
                  v-model="user.id"
                  color="teal"
                  :rules="registerIdRules"
                  label="아이디(이메일 형식)"
                  required
                  clearable
                />
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    class="btn-padding"
                    :disabled="idValidate"
                    @click="checkId(user.id)"
                  >
                    아이디 중복검사
                  </v-btn>
                </v-card-actions>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="user.password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  name="input-10-2"
                  class="input-group--focused"
                  color="teal"
                  label="비밀번호"
                  :rules="registerPasswordRules"
                  persistent-hint
                  required
                  clearable
                  @click:append="show = !show"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="confirmedPassword"
                  color="teal"
                  label="비밀번호 확인"
                  :rules="getConfirmPasswordRules(user.password)"
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
          @click="submitForm(user)"
        >
          가입하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  registerNameRules, registerIdRules, registerPasswordRules, getConfirmPasswordRules,
} from '@/util/formRules'
import { createNamespacedHelpers } from 'vuex'
import DialogMixin from '@/mixins/FormDialog'

const { mapGetters } = createNamespacedHelpers('alertStore')
export default {
  mixins: [DialogMixin],
  data: () => ({
    dialog: false,
    valid: false,
    show: false,
    register: false,
    idCheck: false,
    chekedId: '',
    user: {
      name: '',
      id: '',
      password: '',
    },
    confirmedPassword: '',
    registerNameRules,
    registerIdRules,
    registerPasswordRules,
    getConfirmPasswordRules,
  }),
  computed: {
    ...mapGetters(['sheetInfo']),
    idValidate() {
      return !this.user.id || !this.$refs.idform.validate()
    },
    hasAnyEmptyInput() {
      return !this.user.id || !this.user.name || !this.user.password || !this.confirmedPassword
    },
    hasAnyValueInput() {
      return this.user.id || this.user.name || this.user.password || this.confirmedPassword
    },
  },
  methods: {
    async checkId(userId) {
      const validation = this.$refs.idform.validate()
      if (!validation) {
        return
      }
      const response = await this.$store.dispatch('userStore/checkUserId', userId)
      if (response === userId) {
        this.idCheck = true
        this.chekedId = this.user.id
      }
    },
    async submitForm(newUser) {
      if (!this.valid) {
        return
      }
      if (!this.idCheck || this.chekedId !== this.user.id) {
        this.$store.dispatch('alertStore/setAlertInfo', {
          type: 'warning',
          message: '아이디 중복 검사가 필요합니다!',
        })
        return
      }
      const response = await this.$store.dispatch('userStore/registerUser', newUser)
      if (response === newUser) {
        this.register = true
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
