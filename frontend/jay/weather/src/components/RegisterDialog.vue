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
                    @click="checkId(user)"
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
                  v-model="user.confirmedPassword"
                  color="teal"
                  label="비밀번호 확인"
                  :rules="confirmPassword(user.password)"
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
          :disabled="isEmpty"
          class="mr-4"
          @click="submitForm"
        >
          가입하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  registerNameRules, registerIdRules, registerPasswordRules, confirmPassword,
} from '@/util/formRules'

import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('alertStore')

export default {
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
      confirmedPassword: '',
    },
    registerNameRules,
    registerIdRules,
    registerPasswordRules,
    confirmPassword,
  }),
  computed: {
    ...mapGetters(['getSheetInfo']),
    idValidate() {
      return !this.user.id || !this.$refs.idform.validate()
    },
    isEmpty() {
      return !this.user.id || !this.user.name || !this.user.password || !this.user.confirmedPassword
    },
    isWritten() {
      return this.user.id || this.user.name || this.user.password || this.user.confirmedPassword
    },
  },

  methods: {
    submitForm() {
      if (!this.valid) {
        return
      }
      this.tryRegister(this.user)
      if (this.register) {
        this.$store.dispatch('alertStore/setAlertInfo', {
          type: 'success',
          message: '회원가입이 정상적으로 완료되었습니다!',
        })
        this.$store.dispatch('alertStore/removeAlert')
        this.$refs.form.reset()
        this.dialog = false
        this.register = false
      }
    },
    checkId(newUser) {
      const validation = this.$refs.idform.validate()
      const memberData = JSON.parse(localStorage.getItem('memberData'))
      if (!validation) {
        return
      }

      if (!memberData) {
        this.$store.dispatch('alertStore/setAlertInfo', {
          type: 'success',
          message: '사용 가능한 아이디입니다.',
        })
        this.$store.dispatch('alertStore/removeAlert')
        this.idCheck = true
        this.chekedId = this.user.id
        return
      }
      const isDuplicateId = memberData.some((item) => item.id === newUser.id)
      if (!isDuplicateId) {
        this.$store.dispatch('alertStore/setAlertInfo', {
          type: 'success',
          message: '사용 가능한 아이디입니다.',
        })
        this.$store.dispatch('alertStore/removeAlert')
        this.idCheck = true
        this.chekedId = this.user.id
        return
      }
      if (isDuplicateId) {
        this.$store.dispatch('alertStore/setAlertInfo', {
          type: 'error',
          message: '이미 사용되는 아이디입니다.',
        })
        this.$store.dispatch('alertStore/removeAlert')
      }
    },

    tryRegister(newData) {
      const memberData = JSON.parse(localStorage.getItem('memberData'))
      if (!this.idCheck || this.chekedId !== this.user.id) {
        this.$store.dispatch('alertStore/setAlertInfo', {
          type: 'warning',
          message: '아이디 중복 검사가 필요합니다!',
        })
        this.$store.dispatch('alertStore/removeAlert')
        return
      }

      if (!memberData) {
        localStorage.setItem('memberData', JSON.stringify([newData]))
        this.register = true
        return
      }

      const newUserData = [...memberData, newData]
      localStorage.setItem('memberData', JSON.stringify(newUserData))
      this.register = true
    },

    tryClose() {
      if (!this.isWritten) {
        this.dialog = false
        this.$refs.form.reset()
        return
      }

      if (this.getSheetInfo.confirm) {
        this.dialog = false
        this.$refs.form.reset()
        this.$store.dispatch('alertStore/setCancel')
        return
      }

      this.$store.dispatch(
        'alertStore/setSheetInfo',
        '창을 닫으면 작성한 내용은 지워집니다. 정말 닫으시려면 한번 더 close를 눌러주세요.',
      )
    },
  },
}
</script>

<style scoped>
.btn-padding{
  padding: 3px !important;
}
</style>
