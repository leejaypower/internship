const daumPostcodeMixin = {
  methods: {
    setDaumPostcodePopupVisibleMixin() {
      this.$store.dispatch('weather/resetApiResponseInfo')

      new window.daum.Postcode({
        oncomplete: (result) => {
          const isRoadAddress = result.userSelectedType === 'R'
          this.address = isRoadAddress ? result.roadAddress : result.jibunAddress

          if (this.address) {
            this.$store.dispatch('weather/getLocationCoords', this.address)
          }
        },
      }).open({ popupTitle: '주소 검색하기' })
    },
  },
}

export default daumPostcodeMixin
