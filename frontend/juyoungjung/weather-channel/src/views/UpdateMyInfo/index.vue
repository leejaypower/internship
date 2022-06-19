<template>
  <div>
    <response-info-alert />

    <v-alert
      v-show="isWarningAlertVisible"
      type="warning"
      dismissible
    >
      기존 닉네임과 다르게 닉네임을 설정해주세요.
    </v-alert>

    <h1 class="text-center my-10">
      내 정보 수정하기
    </h1>

    <v-form>
      <v-container>
        <email-input
          :email="email"
          :disabled="isEmailInputDisabled"
        />

        <v-row class="mt-6 justify-center">
          <v-col
            cols="12"
            sm="8"
          >
            <nickname-input
              :nickname="newNickname"
              :disabled="isNicknameInputDisabled"
              @onChangeNickname="onChangeNickname"
            />
          </v-col>

          <v-col
            sm="4"
            class="d-flex justify-center align-center"
          >
            <v-btn
              class="mr-4"
              :color="updateNicknameBtnColor"
              dark
              large
              @click="updateNicknameBtnClickEvent"
            >
              {{ updateNicknameBtnText }}
            </v-btn>

            <v-btn
              v-show="!isNicknameInputDisabled"
              color="light-blue"
              dark
              large
              @click="resetNicknameChange"
            >
              취소하기
            </v-btn>
          </v-col>
        </v-row>

        <div class="mt-16 d-flex justify-center">
          <v-btn
            color="primary"
            class="mr-4"
            outlined
            x-large
            @click="setUpdatePasswordModal(true)"
          >
            비밀번호 수정하기
          </v-btn>
        </div>
      </v-container>
    </v-form>

    <update-password-modal
      :is-update-password-modal-visible="isUpdatePasswordModalVisible"
      @onChangeUpdatePasswordModalVisible="setUpdatePasswordModal"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import EmailInput from '@/components/EmailInput.vue'
import NicknameInput from '@/components/NicknameInput.vue'
import ResponseInfoAlert from '@/components/ResponseInfoAlert.vue'
import UpdatePasswordModal from './components/UpdatePasswordModal.vue'

export default {
  name: 'UpdateMyInfo',
  components: {
    EmailInput,
    NicknameInput,
    ResponseInfoAlert,
    UpdatePasswordModal,
  },
  data: () => ({
    email: '',
    newNickname: '',
    isEmailInputDisabled: true,
    isNicknameInputDisabled: true,
    isUpdatePasswordModalVisible: false,
    isWarningAlertVisible: false,
  }),
  computed: {
    ...mapGetters('user', ['myInfo', 'responseInfo', 'responseInfoType']),
    updateNicknameBtnText() {
      return this.isNicknameInputDisabled ? '수정하기' : '저장하기'
    },
    updateNicknameBtnColor() {
      return this.isNicknameInputDisabled ? 'primary' : 'orange'
    },
    updateNicknameBtnClickEvent() {
      return this.isNicknameInputDisabled
        ? this.toggleNicknameInputWritable
        : this.submitUpdateNickname
    },
  },
  watch: {
    myInfo(value) {
      if (!value) {
        this.$router.push('/')
      }
    },
    responseInfoType(value) {
      if (value === 'success' && !this.isNicknameInputDisabled) {
        this.toggleNicknameInputWritable()
      }
    },
  },
  mounted() {
    this.newNickname = this.myInfo.nickname
    this.email = this.myInfo.email
  },
  methods: {
    onChangeNickname(newValue) {
      if (this.isWarningAlertVisible) this.setWarningAlertVisible(false)
      if (this.responseInfo.visible) this.$store.dispatch('user/resetResponseInfo')
      this.newNickname = newValue
    },
    toggleNicknameInputWritable() {
      this.isNicknameInputDisabled = !this.isNicknameInputDisabled
    },
    resetNicknameChange() {
      this.toggleNicknameInputWritable()
      this.newNickname = this.myInfo.nickname
    },
    setWarningAlertVisible(state) {
      this.isWarningAlertVisible = state
    },
    setUpdatePasswordModal(state) {
      if (state) this.$store.dispatch('user/resetResponseInfo')
      if (!this.isNicknameInputDisabled) this.resetNicknameChange()
      this.isUpdatePasswordModalVisible = state
    },
    submitUpdateNickname() {
      const oldNickname = this.myInfo.nickname
      const { newNickname } = this

      if (oldNickname === newNickname) {
        return this.setWarningAlertVisible(true)
      }

      return this.$store.dispatch('user/updateNickname', {
        email: this.email,
        oldNickname: this.myInfo.nickname,
        newNickname: this.newNickname,
      })
    },
  },
}
</script>
