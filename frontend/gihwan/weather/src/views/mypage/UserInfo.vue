<template>
  <v-container>
    <v-row justify="center">
      <v-col
        :cols="responsiveInputCols"
        class="text-center"
      >
        <h2>내 정보 수정</h2>
      </v-col>
    </v-row>
    <br>
    <ChangeName />
    <br>
    <ChangePassword />
    <v-row justify="center">
      <v-col :cols="responsiveInputCols">
        <v-btn
          type="button"
          color="error"
          block
          outlined
          :disabled="loading"
          @click="onDelete"
        >
          회원 탈퇴
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authMixins from '@/mixins/auth'
import { alert } from '@/lib'
import { deleteUserFetch } from '@/services/api/user'
import { ChangeName, ChangePassword } from '@/views/mypage/components'

export default {
  components: {
    ChangeName,
    ChangePassword,
  },
  mixins: [authMixins],
  data: () => ({
    loading: false,
    constants: {
      USER_DELETE_SUCCESS_TITLE: '회원 탈퇴 성공',
      USER_DELETE_FAIL_TITLE: '회원 탈퇴 실패',
    },
  }),
  methods: {
    async onDelete() {
      const { isConfirmed } = await alert.confirm('회원 탈퇴', '정말 탈퇴하겠습니까?', '삭제', '취소', 'red')
      if (isConfirmed) {
        try {
          this.loading = true
          const result = await deleteUserFetch(this.$store.getters['user/userIdx'])
          this.$store.dispatch('user/logout')
          this.$router.push('/auth')
          alert.success(this.constants.USER_DELETE_SUCCESS_TITLE, result, 'top')
        } catch (error) {
          alert.error(this.constants.USER_DELETE_FAIL_TITLE, error.message)
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>

<style scoped>

</style>
