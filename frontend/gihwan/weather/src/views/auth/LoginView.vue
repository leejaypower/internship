<template>
  <v-form
    v-model="valid"
    class="fill-height d-flex align-center"
    @submit.prevent="onSubmit"
  >
    <v-container>
      <v-row justify="center">
        <router-link to="/">
          <v-img
            :src="logo"
            max-width="100"
            max-height="100"
            alt="logo"
          />
        </router-link>
      </v-row>
      <v-row justify="center">
        <v-col
          :cols="responsiveInputCols"
          class="text-center"
        >
          <h2>로그인</h2>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col :cols="responsiveInputCols">
          <v-text-field
            v-model="id"
            prepend-inner-icon="mdi-account"
            :rules="idRules"
            label="아이디"
            required
            clearable
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col :cols="responsiveInputCols">
          <v-text-field
            v-model="pw"
            prepend-inner-icon="mdi-key"
            :rules="pwRules"
            type="password"
            label="비밀번호"
            required
            clearable
          />
        </v-col>
      </v-row>
      <v-row
        justify="center"
        :dense="true"
      >
        <v-col
          class="d-flex justify-end"
          :cols="responsiveInputCols"
        >
          <v-checkbox
            v-model="autoLogin"
            label="자동 로그인"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col :cols="responsiveInputCols">
          <v-btn
            type="submit"
            class="primary"
            block
            :disabled="isButtonDisabeld"
          >
            로그인
          </v-btn>
        </v-col>
      </v-row>
      <v-row
        justify="center"
        :dense="true"
      >
        <v-col
          :cols="responsiveInputCols"
          align="end"
        >
          <router-link to="signup">
            <span class="text-caption">
              아직 회원이 아니신가요?</span>
            <v-icon
              small
              :color="$vuetify.theme.themes.light.primary"
            >
              mdi-account-plus
            </v-icon>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import authMixins from '@/mixins/auth'
import { idRules, pwRules } from '@/utils/inputRules'
import logo from '@/assets/logo.png'
import alert from '@/utils/sweetalert'

export default {
  mixins: [authMixins],
  data: () => ({
    valid: false,
    id: '',
    pw: '',
    autoLogin: false,
    idRules,
    pwRules,
    logo,
    loading: false,
    prevId: '',
    prevPw: '',
    constants: {
      LOGIN_SUCCESS_TITLE: '로그인 성공',
      LOGIN_FAIL_TITLE: '로그인 실패',
      RE_LOGIN_TRY_TITLE: '로그인 실패',
      RE_LOGIN_TRY_TEXT: `
        <span style="font-size: 15px;">이미 시도한 아이디와 비밀번호입니다.</span>
        <br/>
        <span style="font-size: 14px;">다른 아이디와 비밀번호를 입력해 주세요.</span>
      `,
    },
  }),
  computed: {
    ...mapGetters('user', ['userName', 'isSuccess', 'failMessage']),
    isButtonDisabeld() {
      return !this.valid || this.loading
    },
    failUserReTry() {
      return this.prevId === this.id && this.prevPw === this.pw
    },
  },
  methods: {
    ...mapActions('user', ['login']),
    onSubmit() {
      if (this.failUserReTry) {
        alert.warning(this.constants.RE_LOGIN_TRY_TITLE, this.constants.RE_LOGIN_TRY_TEXT)
        return
      }
      this.loading = true
      this.updateIdAndPasswordByUserInput(this.id, this.pw)
      this.login({ id: this.id, pw: this.pw, autoLogin: this.autoLogin })
      this.loading = false
      if (this.isSuccess) {
        alert.success(this.constants.LOGIN_SUCCESS_TITLE, `${this.userName}님 환영합니다.`, this.alertPositioin)
        this.$router.push('/')
      } else {
        alert.error(this.constants.LOGIN_FAIL_TITLE, this.failMessage)
      }
    },
    updateIdAndPasswordByUserInput(id, pw) {
      this.prevId = id
      this.prevPw = pw
    },
  },
}
</script>
