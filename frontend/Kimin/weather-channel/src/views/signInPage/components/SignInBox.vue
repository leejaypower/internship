<template>
  <v-card
    class="d-flex justify-end sign-in-box"
  >
    <extend-box
      :show="extendShow"
      @succeedSignUp="copyNewAccount"
    />
    <div v-show="show">
      <v-img
        class="sign-in-box__image"
        src="@/assets/imageForSignIn.jpeg"
      />
      <v-card-text
        class="pt-0 pb-0"
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
    <div class="text-center" />
  </v-card>
</template>

<script>
import giveMessage from '@/utils/showSnackBar'
import saveAuthTokens from '@/services/auth/saveAuthTokens'
import logInAxios from '@/services/fakeAxios'
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
  methods: {
    ...mapActions([
      'requestVerifyingToken', 'forwardingMyInfo', 'getMyInfo', 'getTokens',
    ]),
    signIn() {
      if (!this.$refs.form.validate()) return
      this.signing = true
      this.getTokens({ ID: this.ID, password: this.password })
        .then(async (tokens) => {
          giveMessage(`로그인에 성공하셨습니다. ID:${this.ID}`, 'blue') // TODO : 스낵바가 화면과 같이 사라짐
          saveAuthTokens(tokens)
          localStorage.setItem('myInfo', JSON.stringify({ ID: this.ID }))
          const myInfo = await this.getMyInfo()
          this.forwardingMyInfo(myInfo)
          this.$router.push('/Home')
        })
        .catch(() => {
          this.text = '존재하지 않는 계정이거나 비밀번호가 일치하지 않습니다.'
          giveMessage('존재하지 않는 계정이거나 비밀번호가 일치하지 않습니다.', 'red')
          this.signing = false
        })
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
    right: 5%
  }

  .sign-in-box__image{
    width: 40vw;
    max-width: 500px;
  }
</style>
