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
        card-title="로그인"
        :inputs="inputs"
        submit-button-text="로그인"
        :is-inactive-submit-button="isInactiveSubmitButton"
        @onChangeInput="onChangeInput"
        @onSubmitCardForm="onSubmitCardForm"
      >
        <template #underSubmitButton>
          <v-card-text
            class="d-flex justify-center"
          >
            계정이 없으신가요?
            <router-link
              class="pl-1 text-decoration-none"
              to="sign-up"
            >
              회원가입
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
import auth from '@/service/domain/auth'
import LogoAndTitle from '@/ui/components/LogoAndTitle'

export default {
  name: 'SignIn',
  components: { SubmitCardForm, LogoAndTitle },
  data() {
    return {
      inputs: {
        email: {
          label: '이메일',
          value: '',
        },
        password: {
          label: '비밀번호',
          value: '',
          type: 'password',
          autocomplete: 'off',
        },
      },
    }
  },
  computed: {
    isInactiveSubmitButton() {
      const { email, password } = this.inputs
      const isPasswordLengthOverSix = password.value.length >= 6

      return !auth.emailValidation(email.value) || !isPasswordLengthOverSix
    },
  },
  methods: {
    ...mapActions('auth', [
      'signIn',
    ]),
    onChangeInput({ inputKey, value }) {
      this.inputs[inputKey].value = value
    },
    async onSubmitCardForm() {
      const { email, password } = this.inputs
      const response = await this.signIn({ email: email.value, password: password.value })
      if (response.status === 200) {
        auth.setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
        this.$router.push('/')
      }
    },
  },
}
</script>
