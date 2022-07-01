<template>
  <div class="text-center">
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          color="black"
          text
          dark
          v-bind="attrs"
          v-on="on"
        >
          에러 테스트
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-btn
            @click="makeTypeError()"
          >
            타입 에러
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            @click="makeRuntimeError()"
          >
            런타임 에러<br>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            @click="makeApiError()"
          >
            api 에러
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            @click="makeBrowserError()"
          >
            브라우저 에러
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  methods: {
    makeTypeError() {
      const a = { a: 'abc' }
      const b = [...a]
      return b
    },
    makeRuntimeError() {
      this.$store.dispatch('errorStore/causeRuntimeError')
    },
    makeApiError() {
      this.$store.dispatch('errorStore/causeApiError')
    },
    makeBrowserError() {
      setTimeout(() => { throw new Error() }, 1000)
    },
  },
}
</script>

<style scoped>
.v-btn{
  width: 100px
}
</style>
