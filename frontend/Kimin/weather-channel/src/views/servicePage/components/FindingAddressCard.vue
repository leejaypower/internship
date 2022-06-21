<template>
  <v-card
    class="d-flex flex-column justify-space-between find-address-box"
    width="600px"
  >
    <v-card-text
      class="pt-0 pb-0"
    >
      <v-form
        ref="form"
        v-model="valid"
        class="d-flex align-center justify-space-between"
        lazy-validation
        @submit.prevent="searchAddress"
      >
        <v-text-field
          v-model="address.fullAddress"
          label="시/군/구 + 도로명, 동명"
          :rules="addressRule"
          required
          @keyup="requireSearch"
        />
        <v-btn
          color="blue lighten-2 white--text"
          @click="searchAddress"
          @keyup.enter="searchAddress"
        >
          <span>
            검색
          </span>
        </v-btn>
      </v-form>
      <div>
        <span
          class="find-address-box__searchedResult"
          @click="pickAddress"
          @keyup.enter="pickAddress"
        >
          {{ searchedAddress.fullAddress }}
        </span>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="grey"
        class="mr-2"
        width="100px"
        @click="closeButton"
      >
        <span>취소</span>
      </v-btn>
      <v-spacer />
      <v-btn
        :disabled="!searchFinished"
        color="success"
        class="mr-2"
        width="100px"
        @click="saveAddress"
      >
        <span>입력</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { addressValidationRule } from '@/services/auth/validationRules'

export default {
  name: 'FindAddressCard',
  data() {
    return {
      valid: false,
      addressRule: addressValidationRule,
      searchFinished: false,
      address: {
        fullAddress: '',
      },
      searchedAddress: {
        fullAddress: '',
      },
    }
  },
  methods: {
    ...mapActions(['findAddress']),
    async searchAddress() {
      const validationChecked = this.$refs.form.validate()
      if (!validationChecked) {
        return
      }

      const searchResult = await this.findAddress(this.address.fullAddress)
      this.searchedAddress = searchResult
    },
    requireSearch() {
      this.searchFinished = false
    },
    saveAddress() {
      const changedAddress = { ...this.address }
      this.address.fullAddress = ''
      this.$emit('selectAddress', changedAddress)
    },
    closeButton() {
      this.address.fullAddress = ''
      this.$emit('closeButton')
    },
    pickAddress() {
      const copiedResult = { ...this.searchedAddress }
      this.address = copiedResult
      this.searchFinished = true
    },
  },
}
</script>

<style scoped>

  .find-address-box{
    width: 40%;
    height: 400px;
  }

  .find-address-box__searchedResult{
    cursor: pointer;
  }

  .find-address-box__searchedResult:hover{
    color: blue;
    font-weight: 500;
  }
</style>
