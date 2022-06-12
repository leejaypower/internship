<template>
  <v-card
    class="d-flex justify-end sign-in-box"
  >
    <div v-show="show">
      <v-img
        class="sign-in-box__image"
        src="@/assets/imageForSignIn.jpeg"
      />
      <v-card-title>{{ myAccount.name }}님 안녕하세요!</v-card-title>
      <v-card-actions>
        <v-btn
          color="blue lighten-2 white--text"
          @click="logout"
        >
          <span>
            logOut
          </span>
        </v-btn>
        <v-spacer />
        <v-btn
          color="success"
          class="mr-2"
          width="100px"
          @click="goService"
        >
          <span v-show="!signing">Go service</span>
          <v-progress-circular
            v-show="signing"
            indeterminate
            color="primary"
          />
        </v-btn>
      </v-card-actions>
    </div>
    <div class="text-center" />
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'GreetingBox',
  data: () => ({
    show: true,
    signUpShow: false,
    signing: false,
  }),
  computed: {
    myAccount() {
      return this.$store.getters.getMyInfo
    },
  },
  methods: {
    ...mapActions([
      'logOut',
    ]),
    logout() {
      this.logOut()
      this.$router.go(this.$router.currentRoute)
    },
    goService() {
      this.signing = true
      setTimeout(() => {
        this.$router.push('/Home')
      }, 1500)
    },
  },
}

</script>

<style scoped>
  .sign-in-box {
    position: absolute;
    right: 5%
  }

  .sign-in-box__image{
    width: 40vw;
    max-width: 500px;
  }
</style>
