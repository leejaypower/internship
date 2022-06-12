<template>
  <div class="main">
    <h1>
      개인정보
    </h1>
    <table class="info-table">
      <tbody>
        <tr
          v-for="(row,i) in rows"
          :key="row.title"
        >
          <td>
            <h3>{{ row.title }}</h3>
          </td>
          <td class="info-table__value-columns">
            <p
              v-show="row.show"
            >
              {{ row.value }}
            </p>
            <v-text-field
              v-show="!row.show"
              v-model="row.value"
            />
          </td>
          <td>
            <v-btn
              v-show="row.show"
              @click="editContents(i)"
            >
              Edit
            </v-btn>
            <v-btn
              v-show="!row.show"
              @click="saveContents(i)"
            >
              save
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MyInfo',
  data() {
    return {
      rows: [
        {
          title: '이름',
          value: null,
          show: true,
        },
        {
          title: 'password',
          value: null,
          show: true,
        },
        {
          title: '주소',
          value: null,
          show: true,
        },
        {
          title: '전화번호',
          value: null,
          show: true,
        },
        {
          title: '프로필',
          value: null,
          show: true,
        },
      ],

    }
  },
  computed: {
    myInfo() {
      return { ...this.$store.getters.getMyInfo }
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
      'editUserInfo', 'giveMessage', 'logOut',
    ]),
    fetchInfo() {
      const result = [
        {
          title: '이름',
          value: this.myInfo.name,
          show: true,
        },
        {
          title: 'password',
          value: this.myInfo.password,
          show: true,
        },
        {
          title: '주소',
          value: this.myInfo.address,
          show: true,
        },
        {
          title: '전화번호',
          value: this.myInfo.phoneNumber,
          show: true,
        },
        {
          title: '프로필',
          value: this.myInfo.avatarImgSrc,
          show: true,
        },
      ]
      this.rows = result
    },
    editContents(i) {
      this.buttonSwitch(i)
    },
    buttonSwitch(i) {
      this.rows[i].show = !this.rows[i].show
    },
    async saveContents(i) {
      this.buttonSwitch(i)
      const nameValue = this.rows[0].value
      const passwordValue = this.rows[1].value
      const addressValue = this.rows[2].value
      const phoneNumberValue = this.rows[3].value
      const avatarSrcValue = this.rows[4].value
      const editedMyInfo = {
        ID: this.myInfo.ID,
        address: addressValue,
        avatarImgSrc: avatarSrcValue,
        name: nameValue,
        password: passwordValue,
        phoneNumber: phoneNumberValue,
      }
      try {
        await this.editUserInfo(editedMyInfo)
      } catch (error) {
        this.logOut()
        this.signing = false
        const errorCode = (JSON.parse(error.message)).header.HTTPStatusCode
        if (errorCode === '401') {
          this.giveMessage({ text: '로그인정보가 만료되었습니다. 재 로그인 하시기 바랍니다.', color: 'red' })
        } else {
          this.giveMessage({ text: '서버가 응답할 수 없습니다.', color: 'red' })
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

  .info-table__value-columns {
    width: 70%;
  }

  .info-table {
    width: 100%;
  }

</style>
