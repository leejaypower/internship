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
        this.submit(this.user)
      })
    },
    submit(loginUser) {
      this.$store.dispatch('authStore/login', loginUser) // 1
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
