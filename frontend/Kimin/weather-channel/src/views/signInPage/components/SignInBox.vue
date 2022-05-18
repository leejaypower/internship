<template>
  <v-card
    class="d-flex justify-end sign-in-box"
  >
    <signUp-box
      :show="signUpShow"
      @succeedSignUp="signedUp"
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
          v-show="signUpShow"
          icon
          color="blue lighten-2"
          @click="signUpShow = !signUpShow"
        >
          <v-icon>
            {{ 'mdi-chevron-right' }}
          </v-icon>
        </v-btn>
        <v-btn
          v-show="!signUpShow"
          color="blue lighten-2 white--text"
          @click="signUpShow = !signUpShow"
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
          @click="signIn"
        >
          SignIn
        </v-btn>
      </v-card-actions>
    </div>
    <div class="text-center">
      <v-snackbar
        v-model="alarm"
      >
        {{ text }}
        <template #action="{ attrs }">
          <v-btn
            :color="alarmColor"
            text
            v-bind="attrs"
            @click="alarm = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-card>
</template>

<script>
import SignUpBox from './SignUpBox.vue'

export default {
  components: {
    SignUpBox,
  },
  data: () => ({
    show: true,
    signUpShow: false,
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
  }),
  methods: {
    signIn() {
      if (!this.$refs.form.validate()) return
      const signInResult = this.checkAccountTrue(this.ID, this.password)
      if (signInResult) {
        this.giveMessage(`로그인에 성공하셨습니다. ID:${this.ID}`, 'blue')
        this.show = false
      } else {
        this.text = '존재하지 않는 계정이거나 비밀번호가 일치하지 않습니다.'
        this.giveMessage('존재하지 않는 계정이거나 비밀번호가 일치하지 않습니다.', 'red')
      }
      this.ID = null
      this.password = null
    },
    signedUp(ID, password, name) {
      this.signUpShow = false
      this.ID = ID
      this.password = password
      this.giveMessage(`${name}님, 가입에 성공하셨습니다.ID:${ID}`, 'green')
    },
    giveMessage(text, color = 'pink') {
      this.alarm = true
      this.text = text
      this.alarmColor = color
    },
    checkAccountTrue(inputID, inputPW) {
      const accountSets = this.$store.getters.getUserAccount
      if (!accountSets || !accountSets[`${inputID}`] || accountSets[`${inputID}`].password !== inputPW) {
        return false
      }
      return true
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
