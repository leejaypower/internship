<template>
  <div>
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
              :counter="IDCounter"
              label="ID"
              required
              width="50%"
              @keyup="countIDLength"
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
          label="Name"
          :counter="nameCounter"
          required
          @keyup="countNameLength"
          @keyup.enter="signUp"
        />
        <v-text-field
          v-model="password"
          type="password"
          :counter="passwordCounter"
          :rules="passwordRules"
          label="Password"
          required
          @keyup="countPasswordLength"
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
</template>

<script>
import { IDValidationRule, passwordValidationRule, nameValidationRule } from '@/services/auth/validationRules'
import { mapActions } from 'vuex'
import {
  ID_MAX_LENGTH,
  ID_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
} from '@/constants'

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
    duplicationChecked: false,
    IDRules: IDValidationRule,
    nameRules: nameValidationRule,
    passwordRules: passwordValidationRule,
    IDCounter: ID_MIN_LENGTH,
    nameCounter: '2',
    passwordCounter: PASSWORD_MIN_LENGTH,
  }),
  watch: {
    show() {
      this.makeInputEmpty()
    },
  },
  methods: {
    ...mapActions([
      'registerNewAccount', 'investigateID', 'giveMessage',
    ]),
    countIDLength() {
      const textLength = this.ID.length
      if (textLength > ID_MIN_LENGTH) {
        this.IDCounter = ID_MAX_LENGTH
      } else {
        this.IDCounter = ID_MIN_LENGTH
      }
    },
    countPasswordLength() {
      const textLength = this.password.length
      if (textLength > PASSWORD_MIN_LENGTH) {
        this.passwordCounter = PASSWORD_MAX_LENGTH
      } else {
        this.passwordCounter = PASSWORD_MIN_LENGTH
      }
    },
    countNameLength() {
      const textLength = this.name.length
      if (textLength > NAME_MIN_LENGTH) {
        this.nameCounter = NAME_MAX_LENGTH
      } else {
        this.nameCounter = NAME_MIN_LENGTH
      }
    },
    async signUp() {
      if (!this.duplicationChecked) {
        this.giveMessage({ text: 'ID 중복여부를 조회하십시오', color: 'red' })
        return
      }

      if (!this.$refs.form.validate()) {
        this.giveMessage({ text: '필수정보를 입력하십시오', color: 'red' })
        return
      }
      try {
        await this.registerNewAccount({ ID: this.ID, name: this.name, password: this.password })
        this.giveMessage({ text: `${this.name}님, 가입에 성공하셨습니다.ID:${this.ID}`, color: 'green' })
        this.$emit('succeedSignUp', { ID: this.ID, password: this.password, name: this.name })
        this.initialize()
      } catch (error) {
        this.giveMessage({ text: '알 수 없는 오류입니다.', color: 'pink' })
      }
    },
    async checkDuplication() {
      const validationChecked = this.$refs.IDform.validate()
      if (!validationChecked) {
        return
      }
      try {
        const isDuplicated = await this.investigateID(this.ID)
        if (isDuplicated) {
          this.giveMessage({ text: '기존에 등록된 ID입니다.', color: 'red' })
        } else {
          this.duplicationChecked = true
          this.giveMessage({ text: '사용가능한 ID입니다.', color: 'green' })
        }
      } catch {
        this.giveMessage({ text: '알 수 없는 오류가 발생했습니다.', color: 'pink' })
      }
    },
    initialize() {
      this.ID = ''
      this.password = ''
      this.name = ''
      this.duplicationChecked = false
    },
  },
}
</script>
