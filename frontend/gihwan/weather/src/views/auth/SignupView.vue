<template>
  <v-form
    v-model="valid"
    class="fill-height d-flex align-center"
    @submit.prevent="onSubmit"
  >
    <v-container>
      <v-row justify="center">
        <v-img
          :src="logo"
          max-width="100"
          max-height="100"
          alt="logo"
          @click="$router.push({name: 'weather'})"
        />
      </v-row>
      <v-row justify="center">
        <v-col
          :cols="responsiveInputCols"
          class="text-center"
        >
          <h2>회원가입</h2>
        </v-col>
      </v-row>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          :cols="responsiveInputCols"
          class="text-end"
        >
          <v-text-field
            v-model="id"
            prepend-inner-icon="mdi-account"
            :rules="idRules"
            label="아이디"
            required
            clearable
            :error-messages="idErrorMessages"
            :success-messages="idSuccessMessages"
            :loading="loading"
            @input="isIdCheck=null"
          />
          <v-btn
            small
            :color="$vuetify.theme.themes.light.warning"
            :disabled="isDuplicateButtonDisabeld"
            @click="idDuplicateCheck"
          >
            중복 확인
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col :cols="responsiveInputCols">
          <v-text-field
            v-model="name"
            prepend-inner-icon="mdi-badge-account"
            :rules="nameRules"
            label="이름"
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
      <v-row justify="center">
        <v-col :cols="responsiveInputCols">
          <v-text-field
            v-model="pwCheck"
            prepend-inner-icon="mdi-key-change"
            :rules="pwCheckRules"
            type="password"
            label="비밀번호 확인"
            required
            clearable
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col :cols="responsiveInputCols">
          <v-btn
            type="submit"
            class="primary"
            block
            :disabled="isSignUpButtonDisabeld"
          >
            회원가입
          </v-btn>
        </v-col>
      </v-row>
      <v-row
        justify="center"
        :dense="true"
      >
        <v-col
          :cols="responsiveInputCols"
          class="text-end"
        >
          <router-link to="login">
            <span class="text-caption">
              이미 회원이신가요?</span>
            <v-icon
              small
              :color="$vuetify.theme.themes.light.primary"
            >
              mdi-account-arrow-right
            </v-icon>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import authMixins from '@/mixins/auth'
import {
  idRules, pwRules, nameRules, pwCheckRules,
} from '@/utils/inputRules'
import { alert } from '@/lib'
import logo from '@/assets/logo.png'
import { idDuplicateFetch, signupFetch } from '@/services/api/auth'

export default {
  mixins: [authMixins],
  data: () => ({
    valid: false,
    id: '',
    name: '',
    pw: '',
    pwCheck: '',
    idRules,
    nameRules,
    pwRules,
    logo,
    loading: false,
    isIdCheck: null,
    constants: {
      SIGNUP_SUCCESS_TITLE: '회원가입 성공',
      SIGNUP_SUCCESS_TEXT: '로그인을 시도해 보세요.',
      SIGNUP_FAIL_TITLE: '회원가입 실패',
      SIGNUP_FAIL_TEXT: '내용을 다시 확인해 주세요.',
      ID_DUPLICATE_ERROR_TITLE: '중복 체크 에러',
    },
  }),
  computed: {
    isDuplicateButtonDisabeld() {
      return this.isIdCheck || !this.id || this.id.length < 5
    },
    pwCheckRules() {
      return pwCheckRules(this.pw)
    },
    isSignUpButtonDisabeld() {
      return !this.valid || this.loading || !this.isIdCheck
    },
    idErrorMessages() {
      return this.isIdCheck === false ? '이미 사용중인 아이디' : ''
    },
    idSuccessMessages() {
      return this.isIdCheck ? '사용 가능한 아이디' : ''
    },
  },
  methods: {
    async idDuplicateCheck() {
      this.loading = true
      try {
        const isIdCheckResult = await idDuplicateFetch(this.id)
        if (isIdCheckResult) {
          this.isIdCheck = true
          this.loading = false
          return
        }
        this.isIdCheck = false
        this.loading = false
      } catch (error) {
        alert.error(this.constants.ID_DUPLICATE_ERROR_TITLE, error.message, 'top')
      } finally {
        this.loading = false
      }
    },
    async onSubmit() {
      this.loading = true
      try {
        await signupFetch({ id: this.id, pw: this.pw, name: this.name })
        alert.success(
          this.constants.SIGNUP_SUCCESS_TITLE,
          this.constants.SIGNUP_SUCCESS_TEXT,
          'top',
        )
        this.$router.push('login')
      } catch (error) {
        alert.error(this.constants.SIGNUP_FAIL_TITLE, this.constants.SIGNUP_FAIL_TEXT, 'top')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
