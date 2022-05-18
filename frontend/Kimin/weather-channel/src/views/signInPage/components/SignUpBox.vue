<template>
  <v-card
    v-show="show"
    width="380"
  >
    <v-slide-x-reverse-transition>
      <div class="d-flex flex-column justify-space-between fill-height">
        <v-card-title>회원가입하기</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <div class="d-flex">
              <v-form
                ref="IDform"
                v-model="IDvalid"
                lazy-validation
                class="d-flex justify-space-between align-center flex-grow-1 pt-0"
                @submit.prevent="checkDuplication"
              >
                <v-text-field
                  v-model="ID"
                  class="d-flex flex-grow-0"
                  :rules="IDRules"
                  :counter="6"
                  label="ID"
                  required
                  width="50%"
                  @keyup.enter="checkDuplication"
                  @change="duplicationChecked = false"
                />
                <v-btn
                  :disabled="!IDvalid"
                  @click="checkDuplication"
                >
                  {{ 'ID 중복 조회' }}
                </v-btn>
              </v-form>
            </div>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="name"
              :counter="2"
              required
              @keyup.enter="signUp"
            />
            <v-text-field
              v-model="password"
              type="password"
              :counter="8"
              :rules="passwordRules"
              label="password"
              required
              @keyup.enter="signUp"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="signUp"
          >
            SignUp
          </v-btn>
        </v-card-actions>
      </div>
    </v-slide-x-reverse-transition>
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
  </v-card>
</template>

<script>
import { IDValidationRule, passwordValidationRule, nameValidationRule } from '@/views/signInPage/utils/validationRule'

export default {
  name: 'SignUpBox',
  props: {
    show: Boolean,
  },
  data: () => ({
    valid: false,
    IDvalid: false,
    ID: '',
    name: '',
    password: '',
    alarm: false,
    alarmColor: 'pink',
    duplicationChecked: false,
    text: null,
    IDRules: IDValidationRule,
    nameRules: nameValidationRule,
    passwordRules: passwordValidationRule,
  }),
  watch: {
    show() {
      this.initialize()
    },
  },
  methods: {
    signUp() {
      if (!this.duplicationChecked) {
        this.giveMessage('ID 중복여부를 조회하십시오')
        return
      } if (!this.$refs.form.validate()) {
        this.giveMessage('필수정보를 입력하십시오')
        return
      }
      this.makeNewAccount(this.ID, this.name, this.password)
      this.$emit('succeedSignUp', this.ID, this.password, this.name)
      this.duplicationChecked = false
    },
    checkDuplication() {
      if (this.$refs.IDform.validate()) {
        let duplicated = true
        const accountSets = this.$store.getters.getUserAccount
        if (!accountSets || !accountSets[`${this.ID}`]) {
          duplicated = false
        }
        if (duplicated) {
          this.giveMessage('기존에 등록된 ID입니다.', 'red')
        } else {
          this.duplicationChecked = true
          this.giveMessage('사용가능한 ID입니다.', 'green')
        }
      }
    },
    giveMessage(text, color = 'pink') {
      this.alarm = true
      this.text = text
      this.alarmColor = color
    },
    initialize() {
      this.ID = ''
      this.password = ''
      this.name = ''
    },
    makeNewAccount(ID, name, password) {
      const signUpData = {}
      signUpData[`${ID}`] = {
        ID,
        name,
        password,
      }
      this.$store.dispatch('forwardingSignedUpData', signUpData)
      const accountSets = this.$store.getters.getUserAccount
      localStorage.setItem('userAccount', JSON.stringify(accountSets))
    },
  },
}
</script>

<style scoped>
  .expand{
    background-color: white;
  }
</style>
