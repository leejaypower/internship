<template>
  <v-dialog
    :value="isUpdatePasswordModalVisible"
    persistent
    :max-width="reponsiveDialogMaxWidth"
  >
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="closeUpdatePasswordModal"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-alert
        v-show="isWarningAlertVisible"
        type="warning"
      >
        기존 비밀번호와 다르게 비밀번호를 설정해주세요.
      </v-alert>
      <v-card-title class="my-10 d-flex justify-center">
        <h3>
          비밀번호 수정하기
        </h3>
      </v-card-title>
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-container :class="responsiveFormWidth">
          <v-card-text>
            <v-row>
              <password-input
                :password="oldPassword"
                :label="oldPasswordLabel"
                @onChangePassword="onChangeOldPassword"
              />
            </v-row>
            <v-row class="mt-6">
              <password-input
                :password="newPassword"
                :label="newPasswordLabel"
                @onChangePassword="onChangeNewPassword"
              />
            </v-row>
            <v-row class="my-6">
              <password-check-input
                :password="newPassword"
                :password-check="passwordCheck"
                @onChangePasswordCheck="onChangePasswordCheck"
              />
            </v-row>
          </v-card-text>
          <v-card-actions class="mb-16 d-flex flex-column justify-center">
            <v-btn
              color="orange"
              dark
              x-large
              @click="submitUpdatePassword"
            >
              저장하기
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  PC_WIDTH, MOBILE_WIDTH, PC_FORM_WRAPPER_CLASS, MOBILE_FORM_WRAPPER_CLASS,
} from '@/constants/modal-types'
import PasswordInput from '@/components/PasswordInput.vue'
import PasswordCheckInput from '@/components/PasswordCheckInput.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'UpdatePasswordModal',
  components: {
    PasswordInput,
    PasswordCheckInput,
  },
  props: {
    isUpdatePasswordModalVisible: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['onChangeUpdatePasswordModalVisible'],
  data: () => ({
    oldPassword: '',
    oldPasswordLabel: '현재 비밀번호',
    newPassword: '',
    newPasswordLabel: '새 비밀번호',
    passwordCheck: '',
    valid: true,
    isWarningAlertVisible: false,
  }),
  computed: {
    ...mapGetters('user/', [
      'myInfo',
    ]),
    reponsiveDialogMaxWidth() {
      return this.$vuetify.breakpoint.smAndDown ? MOBILE_WIDTH : PC_WIDTH
    },
    responsiveFormWidth() {
      return this.$vuetify.breakpoint.smAndDown
        ? MOBILE_FORM_WRAPPER_CLASS
        : PC_FORM_WRAPPER_CLASS
    },
  },
  methods: {
    onChangeOldPassword(newValue) {
      this.oldPassword = newValue
    },
    onChangeNewPassword(newValue) {
      this.newPassword = newValue
    },
    onChangePasswordCheck(newValue) {
      this.passwordCheck = newValue
    },
    closeUpdatePasswordModal() {
      this.$emit('onChangeUpdatePasswordModalVisible', false)
    },
    setWarningAlertVisible(state) {
      this.isWarningAlertVisible = state
    },
    submitUpdatePassword() {
      const isValid = this.$refs.form.validate()

      if (isValid) {
        const { oldPassword, newPassword } = this

        if (oldPassword === newPassword) {
          return this.setWarningAlertVisible(true)
        }

        if (this.isWarningAlertVisible) this.setWarningAlertVisible(false)

        this.$store.dispatch('user/updatePassword', {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })

        this.$refs.form.reset()
        this.closeUpdatePasswordModal()
      }

      return null
    },
  },
}
</script>
<style lang="scss" scoped>
.form-wrapper {
  width: 350px;
}
.form-wrapper.mobile {
  width: 90%;
}
</style>
