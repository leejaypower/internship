<template>
  <v-card
    class="d-flex justify-end sign-in-box"
  >
    <extend-box
      :show="extendShow"
      @succeedSignUp="copyNewAccount"
    />
    <v-card
      v-show="show"
      class="sign-in-box__container d-flex flex-column"
      width="35vw"
      height="50vh"
      min-width="300px"
      max-width="500px"
      min-height="250px"
      max-height="406px"
    >
      <v-img
        class="sign-in-box__image"
        :class="signInBoxImage"
        src="@/assets/imageForSignIn.jpeg"
      />
      <div class="sign-in-box__item d-flex flex-column justify-space-around fill-height">
        <v-card-text
          class="sign-in-box__form-area pt-0 pb-0"
        >
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="ID"
              :counter="10"
              :rules="IDRules"
              label="ID"
              required
            />
            <v-text-field
              v-model="password"
              type="password"
              :rules="passwordRules"
              label="password"
              required
              @keyup.enter="signIn"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-show="extendShow"
            icon
            color="blue lighten-2"
            @click="extendShow = !extendShow"
          >
            <v-icon>
              {{ 'mdi-chevron-right' }}
            </v-icon>
          </v-btn>
          <v-btn
            v-show="!extendShow"
            color="blue lighten-2 white--text"
            @click="extendShow = !extendShow"
          >
            <span>
              see more
            </span>
          </v-btn>
          <v-spacer />
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-2"
            width="100px"
            @click="signIn"
          >
            <span v-show="!signing">SignIn</span>
            <v-progress-circular
              v-show="signing"
              indeterminate
              color="primary"
            />
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
    <div class="text-center" />
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import ExtendBox from './ExtendBox.vue'

export default {
  components: {
    ExtendBox,
  },
  data: () => ({
    show: true,
    extendShow: false,
    valid: true,
    ID: '',
    IDRules: [
      (v) => !!v || 'ID is required',
    ],
    password: null,
    passwordRules: [
      (v) => !!v || 'password is required',
    ],
    alarm: false,
    alarmColor: 'pink',
    text: '축하합니다. 회원가입에 성공하셨습니다.',
    signing: false,
  }),
  computed: {
    signInBoxImage() {
      if (this.$vuetify.breakpoint.height < 700) {
        return 'sign-in-box__image-dispplay-none'
      }
      return 'sign-in-box__image'
    },
  },
  methods: {
    ...mapActions('auth', ['getMyInfo', 'getTokens']),
    ...mapActions('snackBarStore', ['alertMessage']),
    async signIn() {
      if (!this.$refs.form.validate()) return
      this.signing = true
      try {
        await this.getTokens({ ID: this.ID, password: this.password })
        this.alertMessage({ text: `로그인에 성공하셨습니다. ID:${this.ID}`, color: 'blue' })
        localStorage.setItem('myInfo', JSON.stringify({ ID: this.ID }))
        this.$router.push('/Home')
      } catch (error) {
        if ((JSON.parse(error.message)).header.HTTPStatusCode === '401') {
          this.alertMessage({ text: '존재하지 않는 계정이거나 비밀번호가 일치하지 않습니다.', color: 'red' })
          this.signing = false
        } else {
          this.alertMessage({ text: '서버가 응답할 수 없습니다.', color: 'red' })
          this.signing = false
        }
      }
    },
    copyNewAccount(accountInfo) {
      this.extendShow = false
      this.ID = accountInfo.ID
      this.password = accountInfo.password
    },
  },
}
</script>

<style scoped>
  .sign-in-box {
    position: absolute;
    right: 5%;
  }

  .sign-in-box__container{
    width: 100%;
  }
  .sign-in-box__image{
    height: 40%;
    max-width: 500px;
  }

  .sign-in-box__form-area{
    height: 40%;
    min-height: 150px;
  }

  .sign-in-box__image-dispplay-none{
    display: none;
  }
  .sign-in-box__item{
    width: 100%;
  }

</style>
