<template>
  <v-container>
    <logo-and-title
      src="/images/logo.png"
      position="right"
      :height="96"
      title="오늘의 날씨"
    />
    <v-row
      justify="center"
    >
      <submit-card-form
        card-title="회원가입"
        :inputs="inputs"
        submit-button-text="회원가입"
        :is-inactive-submit-button="isInactiveSubmitButton"
        @onChangeInput="onChangeInput"
        @onSubmitCardForm="onSubmitCardForm"
      >
        <template #underSubmitButton>
          <v-card-text
            class="d-flex justify-center"
          >
            계정이 있으신가요?
            <router-link
              class="pl-1 text-decoration-none"
              to="sign-in"
            >
              로그인
            </router-link>
          </v-card-text>
        </template>
      </submit-card-form>
    </v-row>
  </v-container>
</template>

<script>
import SubmitCardForm from '@/ui/components/SubmitCardForm'
import { mapActions } from 'vuex'
import auth from '@/service/domain/auth/validations'
import utils from '@/utils'
import ruleSentences from '@/constants/ruleSentences'
import LogoAndTitle from '@/ui/components/LogoAndTitle'

const { CORRECT_EMAIL_FORMAT, CORRECT_PASSWORD_FORMAT, NOT_SYNC_PASSWORD } = ruleSentences

export default {
  name: 'SignUp',
  components: { SubmitCardForm, LogoAndTitle },
  data() {
    return {
      inputs: {
        email: {
          label: '이메일',
          value: '',
          rules: [(v) => auth.emailValidation(v) || CORRECT_EMAIL_FORMAT],
        },
        password: {
          label: '비밀번호',
          placeholder: `비밀번호: ${CORRECT_PASSWORD_FORMAT}`,
          value: '',
          type: 'password',
          autocomplete: 'off',
          rules: [(v) => auth.passwordValidaion(v) || CORRECT_PASSWORD_FORMAT],
        },
        comparisonPassword: {
          label: '비밀번호 확인',
          value: '',
          type: 'password',
          autocomplete: 'off',
          rules: [
            (v) => auth.passwordValidaion(v) || CORRECT_PASSWORD_FORMAT,
            (v) => utils.isShallowEqual(this.inputs.password.value, v) || NOT_SYNC_PASSWORD,
          ],
          isValidateOnBlur: true,
        },
      },
    }
  },
  computed: {
    isInactiveSubmitButton() {
      const { email, password, comparisonPassword } = this.inputs
      return !auth.emailValidation(email.value)
      || !auth.passwordValidaion(password.value)
      || !utils.isShallowEqual(password.value, comparisonPassword.value)
    },
  },
  methods: {
    ...mapActions('auth', ['signUp']),
    onChangeInput({ inputKey, value }) {
      this.inputs[inputKey].value = value
    },
    async onSubmitCardForm() {
      const { email, password } = this.inputs
      const response = await this.signUp(
        { email: email.value, password: password.value },
      )
      if (response.status === 200) {
        this.$router.push('/sign-in')
      }
    },
  },
}
</script>
