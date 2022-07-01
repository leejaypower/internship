<template>
  <div>
    <user-api-response-alert />

    <h1 class="text-center mt-10 mb-2">
      회원가입
    </h1>

    <h5 class="text-center grey--text mb-10">
      The Weather Channel에 가입하시면 더 많은 날씨 정보를 받아보실 수 있습니다.
    </h5>

    <v-form
      ref="form"
      v-model="valid"
    >
      <v-container>
        <div>
          <email-input
            :email="email"
            :disabled="false"
            @onChangeEmail="onChangeEmail"
          />
        </div>

        <div class="mt-6">
          <nickname-input
            :nickname="nickname"
            :disabled="false"
            @onChangeNickname="onChangeNickname"
          />
        </div>

        <div class="mt-6">
          <password-input
            :label="passwordLabel"
            :password="password"
            @onChangePassword="onChangePassword"
          />
        </div>

        <div class="mt-6">
          <password-check-input
            :password="password"
            :password-check="passwordCheck"
            @onChangePasswordCheck="onChangePasswordCheck"
          />
        </div>

        <div class="mt-4">
          <v-checkbox
            v-model="isAgreePrivateInfoUse"
            :rules="isAgreePrivateInfoUseRule"
            label="The Weather Channel에서 회원가입을 위해 위에 입력하신 정보를 이용하는데 동의하십니까?"
            required
          />
        </div>

        <div class="mt-10 d-flex justify-center">
          <v-btn
            type="submit"
            color="primary"
            class="mr-4"
            x-large
            @click="submitForm"
          >
            가입하기
          </v-btn>

          <v-btn
            color="orange"
            x-large
            dark
            @click="resetForm"
          >
            모두 지우기
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import EmailInput from '@/components/EmailInput.vue'
import NicknameInput from '@/components/NicknameInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import PasswordCheckInput from '@/components/PasswordCheckInput.vue'
import UserApiResponseAlert from '@/components/UserApiResponseAlert.vue'
import { isAgreePrivateInfoUseRule } from '@/services/inputValidation'

export default {
  name: 'SignUp',
  components: {
    EmailInput,
    NicknameInput,
    PasswordInput,
    PasswordCheckInput,
    UserApiResponseAlert,
  },
  data: () => ({
    valid: true,
    email: '',
    nickname: '',
    password: '',
    passwordLabel: '비밀번호',
    passwordCheck: '',
    select: null,
    isAgreePrivateInfoUseRule,
    isAgreePrivateInfoUse: false,
    isLoginBtnVisible: false,
  }),
  computed: {
    ...mapGetters('alert', [
      'userApiResponse',
    ]),
  },
  watch: {
    userApiResponse: {
      deep: true,
      handler(value) {
        if (value.type === 'success') {
          this.$router.push('/')
        }
      },
    },
  },
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
    submitForm(e) {
      e.preventDefault()

      const isValid = this.$refs.form.validate()

      if (isValid) {
        this.$store.dispatch(
          'user/signup',
          {
            email: this.email,
            nickname: this.nickname,
            password: this.password,
          },
        )
      }
    },
    resetForm() {
      this.$refs.form.reset()
    },
  },
}
</script>
