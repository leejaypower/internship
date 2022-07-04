<template>
  <v-app class="app">
    <router-view />
    <snack-bar />
  </v-app>
</template>

<script>
import SnackBar from '@/components/SnackBar.vue'
import { mapActions, mapGetters } from 'vuex'
import fakeAxios from '@/services/fakeAxios'
import customErrorMaker from '@/services/errorHandling/customErrorMaker'
import Vue from 'vue'
import store from '@/store'

Vue.config.errorHandler = (error) => {
  const newError = customErrorMaker({
    errorName: 'UNCAUGHT_VUE_ERROR',
    message: error.message,
    stack: error.stack,
  })
  store.dispatch('errorStore/recordLog', newError)
  store.dispatch('snackBarStore/alertMessage', newError.alertMessage)
}

export default {
  name: 'App',
  components: {
    SnackBar,
  },
  data() {
    return {
      timer: null,
    }
  },
  computed: {
    ...mapGetters('errorStore', ['getsavedLogs']),
  },
  watch: {
    getsavedLogs(newValue) {
      if (newValue.length === 0) {
        return
      }

      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.saveLogs()
        this.initializeSavedLog()
      }, 5000)
    },
  },
  created() {
    this.getCoordinate()
  },
  methods: {
    ...mapActions('weatherStore', ['getCoordinate']),
    ...mapActions('errorStore', ['initializeSavedLog', 'recordLog']),
    saveLogs() {
      const importantLogs = this.getsavedLogs.filter((log) => // eslint-disable-next-line
        log.level === 'WARN'|| log.level === 'ERROR')
      fakeAxios.post('saveLogs', importantLogs)
    },
  },

}

</script>

<style scoped>
  #app{
    background-color: rgb(214, 222, 221);
    min-width: 700px;
    min-height: 500px;
    overflow: scroll;
  }
</style>
