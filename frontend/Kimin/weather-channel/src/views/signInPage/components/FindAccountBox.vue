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
        <div
          class="d-flex align-center phoneNumberInputContainer"
        >
          <v-text-field
            v-model="phoneNumberFirst"
            type="text"
            required
            :rules="phoneNumberFirstRule"
            width="100px"
          />
          <span class="mr-3 ml-3">-</span>
          <v-text-field
            ref="second"
            v-model="phoneNumberMiddle"
            :rules="phoneNumberSecondAndThirdRule"
            type="text"
            label=""
            required
          />
          <span class="mr-3 ml-3">-</span>
          <v-text-field
            ref="last"
            v-model="phoneNumberLast"
            :rules="phoneNumberSecondAndThirdRule"
            type="text"
            label=""
            required
            @keyup.enter="find"
          />
        </div>
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
import { findUserAccount } from '@/services/auth'
import { nameValidationRule, phoneNumberSecondAndThirdRule, phoneNumberFirstRule } from '@/services/auth/validationRules'

export default {
  name: 'FindAccountBox',
  props: {
    show: Boolean,
  },
  data: () => ({
    valid: false,
    functionTitle: '회원가입하기',
    phoneNumberFirst: '010',
    phoneNumberMiddle: '',
    phoneNumberLast: '',
    name: '',
    nameRule: nameValidationRule,
    phoneNumberSecondAndThirdRule,
    phoneNumberFirstRule,
  }),
  watch: {
    show() {
      this.initialize()
    },
    phoneNumberFirst(value) {
      if (value.length === 3) {
        this.$refs.second.focus()
      }
    },
    phoneNumberMiddle(value) {
      if (value.length === 4) {
        this.$refs.last.focus()
      }
    },
  },
  methods: {
    ...mapActions(['alertMessage']),
    initialize() {
      this.ID = ''
      this.password = ''
      this.name = ''
    },
    find() {
      if (!this.$refs.form.validate()) return
      const accountInformation = {
        name: this.name,
        phoneNumber: `${this.phoneNumberFirst}${this.phoneNumberMiddle}${this.phoneNumberLast}`,
      }
      findUserAccount(accountInformation)
    },
  },
}
</script>
<style>
.phoneNumberInputContainer {
  width: 30vh;
}

.phoneNumberInputContainer input{
  text-align:center
}
</style>
