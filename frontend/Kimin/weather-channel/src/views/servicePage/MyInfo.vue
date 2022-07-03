<template>
  <div class="main d-flex flex-column justify-flex-start">
    <v-container class="d-flex justify-space-between">
      <h1>
        개인정보
      </h1>
      <div>
        <v-btn
          v-show="!showSaveButton"
          @click="tryEdit"
        >
          개인정보수정
        </v-btn>

        <v-btn
          v-show="showSaveButton"
          color="grey"
          class="mr-13"
          @click="cancelEdit"
        >
          취소
        </v-btn>
        <v-btn
          v-show="showSaveButton"
          color="success"
          :disabled="!valid"
          @click="saveContents"
        >
          변경사항저장
        </v-btn>
      </div>
    </v-container>
    <v-container class="mt-10">
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-row
          v-for="(row, i) in rows"
          :key="i"
          class="rowHeight pl-4"
        >
          <v-col
            cols="1"
            class="pa-0 pt-2 pb-2"
            align-self="center"
          >
            {{ row.title }}
          </v-col>
          <v-col
            cols="9"
            class="pa-0 pt-2 pb-2 pl-10"
            align-self="center"
          >
            <v-text-field
              v-show="showInput && row.title !== '주소'"
              v-model="row.value"
              class="pa-0 ma-0"
              :append-icon="showEyeIcon(row)"
              :type="selectType(row)"
              :rules="row.rules"
              @click:append="row.show = !row.show"
            />
            <span
              v-if="row.title !== '비밀번호'"
              v-show="!showInput || row.title === '주소'"
              class="mb-0 text-body-1 pt-2 userInfoSpan"
            >
              {{ row.value }}
            </span>
            <span
              v-else
              v-show="!showInput"
              class="mb-0 text-body-1 pt-2 userInfoSpan"
            >
              **********
            </span>
          </v-col>
          <v-col cols="2">
            <v-btn
              v-show="row.title === '주소'"
              @click="addModalToFindAddress"
            >
              주소검색
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <v-dialog
      v-model="dialog"
      width="600px"
    >
      <find-adress-card
        @selectAddress="selectAddress"
        @closeButton="dialog=false"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FindAdressCard from '@/views/servicePage/components/FindingAddressCard.vue'
import { nameValidationRule, passwordValidationRule, phoneNumberValidationRule } from '@/services/auth'

export default {
  name: 'MyInfo',
  components: {
    FindAdressCard,
  },
  data() {
    return {
      address: {
        fullAddress: '',
        coordinate: '',
      },
      valid: true,
      dialog: false,
      showSaveButton: false,
      showInput: false,
      rows: [
        {
          title: '이름',
          value: '',
          rules: nameValidationRule,
          show: true,
        },
        {
          title: '비밀번호',
          value: '',
          rules: passwordValidationRule,
          show: false,
        },
        {
          title: '전화번호',
          value: '',
          rules: phoneNumberValidationRule,
          show: true,
        },
        {
          title: '프로필',
          value: '',
          rules: [],
          show: true,
        },
        {
          title: '주소',
          value: '',
          rules: [],
          show: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters('userInfoStore', ['getStoredMyInfo']),
  },
  watch: {
    getStoredMyInfo(value) {
      this.fetchInfo(value)
    },
  },
  mounted() {
    this.fetchInfo(this.getStoredMyInfo)
  },
  methods: {
    ...mapActions('auth', ['getMyInfo', 'logOut']),
    ...mapActions('userInfoStore', ['editUserInfo']),
    ...mapActions('weatherStore', ['findAddress']),
    ...mapActions('snackBarStore', ['alertMessage']),
    ...mapActions('snackBarStore', ['alertMessage']),
    fetchInfo(storedUserInfo) {
      const menuItems = ['name', 'password', 'phoneNumber', 'avatarImgSrc', 'address']
      for (let i = 0; i < this.rows.length; i += 1) {
        this.rows[i].value = storedUserInfo[menuItems[i]]
      }
    },
    cancelEdit() {
      this.buttonSwitch()
      this.initializeInput()
    },
    initializeInput() {
      this.fetchInfo(this.getStoredMyInfo)
      const newRows = this.rows.map((row) => Object.assign(row, { show: false }))
      this.rows = newRows
    },
    selectType(row) {
      let type = 'text'
      if (row.title === '비밀번호' && !row.show) {
        type = 'password'
      }
      return type
    },
    showEyeIcon(row) {
      if (row.title !== '비밀번호') {
        return null
      }
      return row.show ? 'mdi-eye' : 'mdi-eye-off'
    },
    tryEdit() {
      this.buttonSwitch()
    },
    selectAddress(selected) {
      this.showSaveButton = true
      this.dialog = false
      this.rows[4].value = selected.fullAddress
      this.address = selected
    },
    addModalToFindAddress() {
      this.dialog = true
    },
    buttonSwitch() {
      this.showSaveButton = !this.showSaveButton
      this.showInput = !this.showInput
    },
    async saveContents() {
      this.showSaveButton = false
      this.showInput = false
      const nameValue = this.rows[0].value
      const passwordValue = this.rows[1].value
      const addressValue = this.address.fullAddress
      const phoneNumberValue = this.rows[2].value
      const avatarSrcValue = this.rows[3].value
      const editedMyInfo = {
        ID: this.getStoredMyInfo.ID,
        address: addressValue,
        avatarImgSrc: avatarSrcValue,
        name: nameValue,
        password: passwordValue,
        phoneNumber: phoneNumberValue,
      }
      try {
        if (addressValue) {
          editedMyInfo.coords = this.address.coordinate
        }
        await this.editUserInfo(editedMyInfo)
        this.getMyInfo()
        this.initializeInput()
      } catch (error) {
        this.logOut()
        this.signing = false
        const errorCode = (JSON.parse(error.message)).header.HTTPStatusCode
        if (errorCode === '401') {
          this.alertMessage({ text: '로그인정보가 만료되었습니다. 재 로그인 하시기 바랍니다.', color: 'red' })
        } else {
          this.alertMessage({ text: '서버가 응답할 수 없습니다.', color: 'red' })
        }
      }
    },
  },
}
</script>

<style scoped>
  .main{
    width: 100%
  }
  .rowHeight{
    height: 50px
  }
  .userInfoSpan{
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width:100%;
  }

</style>
