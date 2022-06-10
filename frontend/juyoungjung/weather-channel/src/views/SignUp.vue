<template>
  <div>
    <response-info-alert />
    <h1 class="text-center my-10">
      회원가입
    </h1>
    <h3 class="text-center mb-16">
      The Weather Channel에 가입하시면 더 많은 날씨 정보를 받아보실 수 있습니다.
    </h3>

    <v-form
      ref="form"
      v-model="valid"
    >
      <v-container>
        <v-row>
          <email-input
            :email="email"
            :disabled="false"
            @onChangeEmail="onChangeEmail"
          />
        </v-row>
        <v-row class="mt-6">
          <nickname-input
            :nickname="nickname"
            :disabled="false"
            @onChangeNickname="onChangeNickname"
          />
        </v-row>
        <v-row class="mt-6">
          <password-input
            :label="passwordLabel"
            :password="password"
            @onChangePassword="onChangePassword"
          />
        </v-row>
        <v-row class="mt-6">
          <password-check-input
            :password="password"
            :password-check="passwordCheck"
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
import ResponseInfoAlert from '@/components/ResponseInfoAlert.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'SignUp',
  components: {
    EmailInput,
    NicknameInput,
    PasswordInput,
    PasswordCheckInput,
    ResponseInfoAlert,
  },
  data: () => ({
    valid: true,
    email: '',
    nickname: '',
    password: '',
    passwordLabel: '비밀번호',
    passwordCheck: '',
    select: null,
    isAgreePrivateInfoUseRule: [
      (v) => !!v || '회원가입을 계속 진행하시려먼 개인정보이용에 동의하셔야 합니다.',
    ],
    isAgreePrivateInfoUse: false,
    isLoginBtnVisible: false,
  }),
  computed: {
    ...mapGetters('user/', [
      'responseInfoType',
    ]),
  },
  watch: {
    responseInfoType(value) {
      if (value === 'success') {
        this.$router.push('/')
      }
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
    submitForm() {
      const isValid = this.$refs.form.validate()

      if (isValid) {
        this.$store.dispatch('user/signup', { email: this.email, nickname: this.nickname, password: this.password })
      } else {
        this.passwordCheckError = true
      }
    },
    resetForm() {
      this.$refs.form.reset()
    },
  },
}
</script>
