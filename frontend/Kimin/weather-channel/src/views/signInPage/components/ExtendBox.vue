<template>
  <v-card
    v-show="show"
    min-width="300px"
    width="60%"
    class="extend-box"
  >
    <v-slide-x-reverse-transition>
      <div class="d-flex flex-column justify-space-between fill-height">
        <v-tabs>
          <v-tab @click="signIn=true">
            SignUp
          </v-tab>
          <v-tab @click="signIn=false">
            Find Account
          </v-tab>
        </v-tabs>
        <v-card-title
          :class="extendBoxTitle"
        >
          {{ functionTitle }}
        </v-card-title>
        <div>
          <sign-up-box
            v-if="signIn"
            @succeedSignUp="succeedSignUp"
          />
          <find-account-box v-if="!signIn" />
        </div>
      </div>
    </v-slide-x-reverse-transition>
  </v-card>
</template>

<script>

import FindAccountBox from '@/views/signInPage/components/FindAccountBox.vue'
import SignUpBox from '@/views/signInPage/components/SignUpBox.vue'

export default {
  name: 'ExtensionBox',
  components: {
    SignUpBox, FindAccountBox,
  },
  props: {
    show: Boolean,
  },
  data() {
    return {
      signIn: true,
    }
  },
  computed: {
    functionTitle() {
      if (this.signIn === true) {
        return '회원가입하기'
      }
      return '계정찾기'
    },
    extendBoxTitle() {
      if (this.$vuetify.breakpoint.height < 700) {
        return 'extend-box__title-dispplay-none'
      }
      return ''
    },
  },
  methods: {
    succeedSignUp(accountInfo) {
      this.$emit('succeedSignUp', accountInfo)
    },
  },
}
</script>

<style scoped>
  .extend-box__title-dispplay-none{
    display: none;
  }

</style>
