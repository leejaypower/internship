<template>
  <div>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <div class="d-flex" />
        <v-text-field
          v-model="name"
          label="Name"
          :rules="nameRule"
          required
          @keyup.enter="find"
        />
        <v-text-field
          v-model="phoneNumber"
          type="text"
          :rules="phoneNumberRule"
          label="Phone Number"
          required
          @keyup.enter="find"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        :disabled="!valid"
        color="primary"
        class="mr-4"
        @click="find"
      >
        Find
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import giveMessage from '@/utils/showSnackBar'

export default {
  name: 'FindAccountBox',
  props: {
    show: Boolean,
  },
  data: () => ({
    valid: false,
    functionTitle: '회원가입하기',
    phoneNumber: '',
    name: '',
    nameRule: [
      (v) => !!v || 'Name is required',
    ],
    phoneNumberRule: [
      (v) => !!v || 'phoneNumber is required',
      (v) => /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(v) || '전화번호 형식에 맞지 않습니다.(하이픈 포함필요)',
    ],
  }),
  watch: {
    show() {
      this.initialize()
    },
  },
  methods: {
    initialize() {
      this.ID = ''
      this.password = ''
      this.name = ''
    },
    find() { // TO DO : 기능 검증 && 조건문 반복문 부분 리팩토링 필요
      if (!this.$refs.form.validate()) return
      const accountSets = this.$store.getters.callDBInfo_userAccount
      if (!accountSets) return
      const userAccount = accountSets.find((account) => {
        const DBhasName = account.name === this.name
        const isCorrectPhoneNumber = account.phoneNumber === this.phoneNumber
        return (DBhasName && isCorrectPhoneNumber)
      })
      if (userAccount) {
        giveMessage(`your ID is ${userAccount.ID}`, 'green')
      } else {
        giveMessage('you don\'t have account', 'red')
      }
    },
  },
}
</script>
