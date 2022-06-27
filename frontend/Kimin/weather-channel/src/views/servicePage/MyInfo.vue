<template>
  <div class="main d-flex flex-column justify-flex-start">
    <v-container class="d-flex justify-space-between">
      <h1>
        개인정보
      </h1>
      <v-btn
        v-show="!showSaveButton"
        @click="tryEdit"
      >
        개인정보수정
      </v-btn>
      <v-btn
        v-show="showSaveButton"
        color="success"
        @click="saveContents"
      >
        변경사항저장
      </v-btn>
    </v-container>
    <v-container class="mt-10">
      <v-row
        v-for="(row) in rows"
        :key="row.title"
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
            v-show="showInput"
            v-model="row.value"
            class="pa-0 ma-0"
            hide-details="true"
          />
          <span
            v-show="!showInput"
            class="mb-0 text-body-1 pt-2 pb-2"
          >
            {{ row.value }}
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

export default {
  name: 'MyInfo',
  components: {
    FindAdressCard,
  },
  data() {
    return {
      address: {
        fullAddress: null,
        coordinate: null,
      },
      dialog: false,
      showSaveButton: false,
      showInput: false,
      rows: [
        {
          title: '이름',
          value: null,
        },
        {
          title: 'password',
          value: null,
        },
        {
          title: '전화번호',
          value: null,
        },
        {
          title: '프로필',
          value: null,
        },
        {
          title: '주소',
          value: null,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getStoredMyInfo']),
    myInfo() {
      return this.getStoredMyInfo
    },
  },
  watch: {
    myInfo() {
      this.fetchInfo()
    },
  },
  mounted() {
    this.fetchInfo()
  },
  methods: {
    ...mapActions([
      'getMyInfo', 'findAddress', 'editUserInfo',
      'alertMessage', 'logOut',
    ]),
    fetchInfo() {
      const result = [
        {
          title: '이름',
          value: this.myInfo.name,
        },
        {
          title: 'password',
          value: this.myInfo.password,
        },
        {
          title: '전화번호',
          value: this.myInfo.phoneNumber,
        },
        {
          title: '프로필',
          value: this.myInfo.avatarImgSrc,
        },
        {
          title: '주소',
          value: this.myInfo.address,
        },
      ]
      this.rows = result
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
        ID: this.myInfo.ID,
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

</style>
