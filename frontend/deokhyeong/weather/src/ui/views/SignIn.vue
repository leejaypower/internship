<template>
  <v-container>
    <v-row
      justify="center"
    >
      <logo-and-title
        logo-src="/images/logo.png"
        logo-position="right"
        :logo-height="96"
        title="오늘의 날씨"
      />
    </v-row>
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
import SubmitCardForm from '@/ui/components/SubmitCardForm.vue'
import { mapActions } from 'vuex'
import validationHooks from '@/hooks/validationHooks'
import LogoAndTitle from '../components/LogoAndTitle.vue'

export default {
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
        },
      },
    }
  },
  computed: {
    isInactiveSubmitButton() {
      const { email, password } = this.inputs
      const { useEmailValidationHook } = validationHooks
      const isPasswordLengthOverSix = password.value.length >= 6

      return !useEmailValidationHook(email.value) || !isPasswordLengthOverSix
    },
  },
  methods: {
    ...mapActions('authStore', [
      'signIn',
    ]),
    onChangeInput({ inputKey, value }) {
      this.inputs[inputKey].value = value
    },
    async onSubmitCardForm() {
      const { email, password } = this.inputs
      await this.signIn({ email: email.value, password: password.value })
    },
  },
}
</script>
