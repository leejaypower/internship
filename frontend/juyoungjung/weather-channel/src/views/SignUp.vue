<template>
  <div>
    <v-alert
      v-show="alertInfo.isError"
      :type="alertInfo.type"
    >
      {{ alertInfo.message }}
    </v-alert>

    <h1 class="text-center my-10">
      회원가입
    </h1>
    <h3 class="text-center mb-16">
      The Weather Channel에 가입하시면 더 많은 날씨 정보를 받아보실 수 있습니다.
    </h3>

    <v-form
      v-model="valid"
    >
      <v-container>
        <v-row>
          <email-input
            :email="email"
            @onChangeEmail="onChangeEmail"
          />
        </v-row>
        <v-row class="mt-6">
          <nickname-input
            :nickname="nickname"
            @onChangeNickname="onChangeNickname"
          />
        </v-row>
        <v-row class="mt-6">
          <password-input
            :password="password"
            @onChangePassword="onChangePassword"
          />
        </v-row>
        <v-row class="mt-6">
          <password-check-input
            :password="password"
            :password-check="passwordCheck"
            :password-check-error="passwordCheckError"
            :reset-password-check-error="resetPasswordCheckError"
            @onChangePasswordCheck="onChangePasswordCheck"
          />
        </v-row>
        <v-row class="mt-6">
          <v-checkbox
            v-model="isAgreePrivateInfoUse"
            :rules="isAgreePrivateInfoUseRule"
            label="The Weather Channel에서 회원가입을 위해 위에 입력하신 정보를 이용하는데 동의하십니까?"
            required
          />
        </v-row>
        <v-row class="mt-16 d-flex justify-center">
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submitForm"
          >
            가입하기
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="resetForm"
          >
            모두 지우기
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import EmailInput from '@/components/EmailInput.vue'
import NicknameInput from '@/components/NicknameInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import PasswordCheckInput from '@/components/PasswordCheckInput.vue'
import checkDuplicatedInfo from '@/services/checkDuplicatedInfo'
import saveTargetAtLocalStorage from '@/services/saveTargetAtLocalStorage'
import { USER_INFO_EMAIL, USER_INFO_NICKNAME, USER_INFO_PASSWORD } from '@/constants/signup-types'

export default {
  name: 'SignUp',
  components: {
    EmailInput,
    NicknameInput,
    PasswordInput,
    PasswordCheckInput,
  },
  data: () => ({
    valid: true,
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
    select: null,
    isAgreePrivateInfoUseRule: [
      (v) => !!v || '회원가입을 계속 진행하시려먼 개인정보이용에 동의하셔야 합니다.',
    ],
    isAgreePrivateInfoUse: false,
    alertInfo: {
      type: 'info',
      isError: false,
      message: '',
    },
    passwordCheckError: false,
  }),
  methods: {
    onChangeEmail(newValue) {
      this.email = newValue
    },
    onChangeNickname(newValue) {
      this.nickname = newValue
    },
    onChangePassword(newValue) {
      this.password = newValue
    },
    onChangePasswordCheck(newValue) {
      this.passwordCheck = newValue
    },
    setAlertMessage(info) {
      this.alertInfo.type = info ? 'error' : 'success'
      this.alertInfo.isError = info ? 'error' : 'success'
      this.alertInfo.message = info ? `동일한 ${info} 이미 가입한 사용자가 있습니다. 다른 ${info} 사용해주세요.` : '회원가입에 성공하였습니다.'
    },
    submitForm() {
      const isValid = this.valid && this.password === this.passwordCheck

      if (isValid) {
        const needDuplicateCheckList = [USER_INFO_EMAIL, USER_INFO_NICKNAME]
        const firstDuplicatedInfo = needDuplicateCheckList
          .find((info) => checkDuplicatedInfo(this[info], info))

        if (!firstDuplicatedInfo) {
          const needSaveList = needDuplicateCheckList.concat(USER_INFO_PASSWORD)
          needSaveList.map((info) => saveTargetAtLocalStorage(info, this[info]))
          this.setAlertMessage(null)
        } else {
          const translatedAlertInfoTarget = {
            email: '이메일로',
            nickname: '닉네임으로',
          }
          this.setAlertMessage(translatedAlertInfoTarget[firstDuplicatedInfo])
        }
      } else {
        this.passwordCheckError = true
      }
    },
    resetForm() {
      this.$refs.form.reset()
    },
    resetPasswordCheckError() {
      this.passwordCheckError = false
    },
  },
}
</script>
