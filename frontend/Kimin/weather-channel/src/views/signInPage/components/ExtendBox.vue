<template>
  <v-card
    v-show="show"
    width="380"
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
        <v-card-title>{{ functionTitle }}</v-card-title>
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
  },
  methods: {
    succeedSignUp(accountInfo) {
      this.$emit('succeedSignUp', accountInfo)
    },
  },
}
</script>
