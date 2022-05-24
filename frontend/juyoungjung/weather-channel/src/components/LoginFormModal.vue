<template>
  <v-dialog
    v-model="isLoginFormModalVisible"
    persistent
    :max-width="reponsiveDialogMaxWidth"
  >
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="closeLoginFormModal()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-alert
        v-show="isWrongEmailOrPasswordError"
        type="error"
      >
        잘못된 이메일 또는 비밀번호입니다. 다시 확인 후 시도해주세요.
      </v-alert>
      <v-alert
        v-show="isNotRegisteredEmailError"
        type="error"
      >
        아직 가입되지 않은 이메일입니다. 회원가입 후 다시 시도해주세요.
      </v-alert>
      <v-card-title class="my-14 d-flex flex-column justify-center">
        <h3 class="mb-10">
          The Weather Channel
        </h3>
        <v-row
          class="d-flex justify-center align-center flex-wrap"
        >
          로그인을 통해
          <v-chip
            class="ma-2"
            color="orange"
            outlined
            label
          >
            요일별
          </v-chip>
          <v-chip
            class="ma-2"
            color="orange"
            outlined
            label
          >
            시간별
          </v-chip>

          날씨정보를 확인해보세요!
        </v-row>
      </v-card-title>
      <v-form
        v-model="valid"
      >
        <v-container :class="responsiveFormWidth">
          <v-card-text>
            <v-row>
              <email-input
                :email="email"
                @onChangeEmail="onChangeEmail"
              />
            </v-row>
            <v-row>
              <password-input
                :password="password"
                @onChangePassword="onChangePassword"
              />
            </v-row>
          </v-card-text>
          <v-card-actions class="my-14 d-flex justify-center align-center">
            <router-link to="/signup">
              <v-btn
                class="mr-5"
                x-large
                color="primary"
                text
                @click="closeLoginFormModal()"
              >
                회원가입
              </v-btn>
            </router-link>
            <v-btn
              x-large
              color="primary"
              class="white--text"
              @click="submitForm"
            >
              로그인
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  PC_WIDTH, MOBILE_WIDTH, PC_FORM_WRAPPER_CLASS, MOBILE_FORM_WRAPPER_CLASS,
} from '@/constants/login-form-modal-types'
import EmailInput from './EmailInput.vue'
import PasswordInput from './PasswordInput.vue'

export default {
  name: 'LoginFormModal',
  components: { EmailInput, PasswordInput },
  data: () => ({
    email: '',
    password: '',
    valid: true,
    isWrongEmailOrPasswordError: false,
    isNotRegisteredEmailError: false,
  }),
  computed: {
    ...mapGetters('user/', ['isLoginFormModalVisible']),
    reponsiveDialogMaxWidth() {
      return this.$vuetify.breakpoint.smAndDown ? MOBILE_WIDTH : PC_WIDTH
    },
    responsiveFormWidth() {
      return this.$vuetify.breakpoint.smAndDown
        ? MOBILE_FORM_WRAPPER_CLASS
        : PC_FORM_WRAPPER_CLASS
    },
  },
  methods: {
    onChangeEmail(newValue) {
      this.email = newValue
    },
    onChangePassword(newValue) {
      this.password = newValue
    },
    closeLoginFormModal() {
      this.$store.dispatch('user/setLoginFormModalVisible', {
        visible: false,
      })
    },
    submitForm() {
      const isValid = this.valid
      const localStorageEmail = localStorage.getItem('email')
      const localStoragePassword = localStorage.getItem('password')

      if (isValid) {
        if (!localStorageEmail) {
          this.isNotRegisteredEmailError = true
          return
        }
        if (
          localStorageEmail === this.email
          && localStoragePassword === this.password
        ) {
          const nickname = localStorage.getItem('nickname')
          this.$store.dispatch('user/login', {
            data: {
              email: this.email,
              nickname,
              password: this.password,
            },
            status: 200,
          })
          this.isNotRegisteredEmailError = false
          this.isWrongEmailOrPasswordError = false
          this.closeLoginFormModal()
        } else {
          this.isWrongEmailOrPasswordError = true
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.form-wrapper {
  width: 350px;
}
.form-wrapper.mobile {
  width: 90%;
}
</style>
