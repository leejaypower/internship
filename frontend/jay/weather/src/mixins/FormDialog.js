export default {
  methods: {
    tryClose() {
      if (!this.hasAnyValueInput) {
        this.dialog = false
        this.$refs.form.reset()
        return
      }

      if (this.sheetInfo.confirm) {
        this.dialog = false
        this.$refs.form.reset()
        this.$store.dispatch('alertStore/setCancel')
        return
      }

      this.$store.dispatch(
        'alertStore/setSheetInfo',
        '창을 닫으면 작성한 내용은 지워집니다. 정말 닫으시려면 한번 더 close를 눌러주세요.',
      )
    },
    closeDialog() {
      if (this.register) {
        this.$refs.form.reset()
        this.dialog = false
        this.register = false
      }
    },
  },

}
