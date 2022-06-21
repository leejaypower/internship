<template>
  <div class="pt-4 px-12 pb-12">
    <title-header title="마이 페이지" />
    <repair-card-form
      card-title="기본 정보"
      :inputs="inputs"
      :is-editting="isEditting"
      repair-button-text="수정"
      submit-button-text="확인"
      :is-inactive-submit-button="isInactiveSubmitButton"
      @onChangeInput="onChangeInput"
      @onRepairButton="onSwitchEditting"
      @onSubmitButton="onSubmitButton"
      @onCancelButton="onCancelButton"
    />
    <select-list-card-form
      class="mt-4"
      card-title="위치 설정"
      repair-button-text="추가"
      init-button-text="초기화"
      :non-selected-bookmarks="nonSelectedBookmarks"
      :selected-location="selectedLocation || {}"
      is-select-list-type
      :handle-non-select-card-delete-button="onDeleteLocation"
      :handle-non-select-card-select-button="onSelectLocation"
      :is-in-active-init-button="isInActiveInitButton"
      @onInitButton="onInitLocationList"
      @onRepairButton="onMoveToLocationAdd"
    />
    <div class="d-flex justify-center pt-5">
      <v-btn @click="onClickLogout">
        로그아웃
      </v-btn>
    </div>
    <bottom-navigation />
  </div>
</template>
<script>
import BottomNavigation from '@/ui/components/layout/BottomNavigation'
import RepairCardForm from '@/ui/components/RepairCardForm'
import ruleSentences from '@/constants/ruleSentences'
import authApi from '@/service/api/auth'
import auth from '@/service/domain/auth/validations'
import utils from '@/utils'
import { mapActions, mapGetters } from 'vuex'
import TitleHeader from '@/ui/components/TitleHeader'
import SelectListCardForm from '@/ui/views/MyPage/SelectedListCardForm'

const { CORRECT_EMAIL_FORMAT, CORRECT_PASSWORD_FORMAT, NOT_SYNC_PASSWORD } = ruleSentences

export default {
  name: 'MyPage',
  components: {
    BottomNavigation,
    RepairCardForm,
    TitleHeader,
    SelectListCardForm,
  },
  data() {
    return {
      inputs: {
        email: {
          label: '이메일',
          value: '',
          rules: [(v) => auth.emailValidation(v) || CORRECT_EMAIL_FORMAT],
          disabled: true,
        },
        password: {
          label: '비밀번호',
          placeholder: '비밀번호',
          value: '',
          type: 'password',
          rules: [(v) => auth.passwordValidaion(v) || CORRECT_PASSWORD_FORMAT],
          autocomplete: 'off',
          disabled: true,
        },
        newPassword: {
          label: '새 비밀번호',
          placeholder: `새 비밀번호 : ${CORRECT_PASSWORD_FORMAT}`,
          value: '',
          type: 'password',
          rules: [(v) => auth.passwordValidaion(v) || CORRECT_PASSWORD_FORMAT],
          autocomplete: 'off',
          disabled: true,
        },
        newPasswordComparison: {
          label: '새 비밀번호 확인',
          value: '',
          type: 'password',
          rules: [
            (v) => auth.passwordValidaion(v) || CORRECT_PASSWORD_FORMAT,
            (v) => utils.isShallowEqual(this.inputs.newPassword.value, v) || NOT_SYNC_PASSWORD,
          ],
          autocomplete: 'off',
          disabled: true,
        },
      },
      isEditting: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['email', 'password', 'bookmarkLocations', 'selectedLocation']),
    isInactiveSubmitButton() {
      const {
        email, password, newPassword, newPasswordComparison,
      } = this.inputs
      return !auth.emailValidation(email.value)
      || !auth.passwordValidaion(password.value)
      || !auth.passwordValidaion(newPassword.value)
      || !utils.isShallowEqual(newPassword.value, newPasswordComparison.value)
    },
    nonSelectedBookmarks() {
      return this.bookmarkLocations.filter(
        (bookmark) => bookmark.location !== this.selectedLocation.location,
      )
    },
    isInActiveInitButton() {
      return this.bookmarkLocations?.length === 0
    },
  },
  watch: {
    isEditting() {
      const inputKeys = Object.keys(this.inputs)
      inputKeys.forEach((key) => {
        this.inputs[key].disabled = !this.isEditting
      })
    },
  },
  created() {
    this.inputs.email.value = this.email
    this.inputs.password.value = this.password
  },
  methods: {
    ...mapActions('auth', ['repairUserInfo', 'deleteLocation', 'selectLocation', 'initLocation']),
    onChangeInput({ inputKey, value }) {
      this.inputs[inputKey].value = value
    },
    onSwitchEditting() {
      this.isEditting = !this.isEditting
    },
    setInitInfo() {
      this.inputs.email.value = this.email
      this.inputs.password.value = this.password
      this.inputs.newPassword.value = ''
      this.inputs.newPasswordComparison.value = ''
      this.isEditting = false
    },
    async onSubmitButton() {
      const {
        email, password, newPassword,
      } = this.inputs
      const repairUserData = {
        email: email.value,
        password: password.value,
        newPassword: newPassword.value,
      }
      const response = await this.repairUserInfo({ repairUserData })
      if (response.status === 200) {
        this.setInitInfo()
      }
    },
    onCancelButton() {
      this.setInitInfo()
    },
    async onClickLogout() {
      const response = await authApi.logout()
      if (response.status === 200) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        // 원래 go를 하고 싶으나 새로고침 시 locationstorage의 users이
        // 초기 세팅 값으로 돌아옴. 대안으로 push 사용
        this.$router.push('/sign-in')
      }
    },
    onMoveToLocationAdd() {
      this.$router.push('/location-add')
    },
    onInitLocationList() {
      this.initLocation()
    },
    onDeleteLocation(location) {
      this.deleteLocation({ location })
    },
    onSelectLocation(location) {
      this.selectLocation({ location })
    },
  },
}
</script>
