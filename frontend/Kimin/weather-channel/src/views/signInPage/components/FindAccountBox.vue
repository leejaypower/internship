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
import { mapActions } from 'vuex'

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
    ...mapActions(['giveMessage']),
    initialize() {
      this.ID = ''
      this.password = ''
      this.name = ''
    },
    find() {
      if (!this.$refs.form.validate()) return
      const accountSets = this.$store.getters.callDBInfo_userAccount
      if (!accountSets) return
      const userAccount = accountSets.find((account) => {
        const DBhasName = account.name === this.name
        const isCorrectPhoneNumber = account.phoneNumber === this.phoneNumber
        return (DBhasName && isCorrectPhoneNumber)
      })
      if (userAccount) {
        this.giveMessage({ text: `당신의 ID는 ${userAccount.ID}입니다.`, color: 'green' })
      } else {
        this.giveMessage({ text: '유효한 계정이 존재하지 않습니다.', color: 'red' })
      }
    },
  },
}
</script>
