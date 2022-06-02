<template>
  <v-form
    ref="form"
    v-model="valid"
  >
    <p>더 많은 정보를 만나보세요!</p>
    <v-text-field
      v-model="user.id"
      color="teal"
      label="아이디"
      :rules="loginIdRules"
      dense
      outlined
      required
      @keyup.enter="validate"
    />

    <v-text-field
      v-model="user.password"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="loginPasswordRules"
      :type="show ? 'text' : 'password'"
      name="input-10-2"
      label="Password"
      class="input-group--focused"
      required
      dense
      outlined
      @click:append="show = !show"
      @keyup.enter="validate"
    />

    <v-btn
      color="success"
      class="mr-4 btn-padding"
      @click="validate"
    >
      로그인
    </v-btn>
    <register-dialog />
  </v-form>
</template>

<script>
import { loginIdRules, loginPasswordRules } from '@/util/formRules'
import RegisterDialog from '@/components/RegisterDialog.vue'

export default {
  components: { RegisterDialog },
  data: () => ({
    user: {
      id: '',
      password: '',
    },
    valid: true,
    show: false,
    loginIdRules: [],
    loginPasswordRules: [],
  }),
  methods: {
    validate() {
      this.loginIdRules = loginIdRules
      this.loginPasswordRules = loginPasswordRules
      this.$nextTick(() => {
        const validation = this.$refs.form.validate()
        if (!validation) {
          return
        }
        this.loginUser(this.user)
      })
    },
    loginUser(userData) {
      const memberData = JSON.parse(localStorage.getItem('memberData'))
      const userInfo = memberData.find((item) => item.id === userData.id)

      if (userInfo === undefined || userInfo.password !== userData.password) {
        this.$store.dispatch('alertStore/setAlertInfo', {
          type: 'error',
          message: '아이디나 비밀번호를 잘못 입력했습니다. 다시 확인해주세요.',
        })
        this.$store.dispatch('alertStore/removeAlert')
        return
      }

      this.$store.dispatch('userStore/setUserInfo', userInfo)
    },
  },
}
</script>

<style scoped>
.v-form{
  padding: 10px;
}

h4{
  margin-bottom: 10px;
}

p{
  font-size: 13px;
  text-align: center;
}

.btn-padding{
  padding: 5px !important
}

</style>
