<template>
  <v-container>
    <v-card>
      <v-skeleton-loader
        v-if="!forecastDaily4DaysData"
        class="pa-6"
        height="100"
        type="paragraph"
      />

      <div v-else>
        <v-row
          class="py-4 d-flex justify-center align-center"
        >
          <v-col
            cols="12"
            md="6"
            class="d-flex justify-center align-center text-center"
          >
            <span v-if="nickname">현재 {{ nickname }}님이 계신 곳이 아닌<br> 다른 지역의 날씨정보를 알고 싶으신가요?</span>
            <span v-else>현재 계신 곳이 아닌<br> 다른 지역의 날씨정보를 알고 싶으신가요?</span>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="d-flex justify-center align-center"
          >
            <v-btn
              color="light-blue"
              outlined
              @click="setDaumPostcodePopupVisible"
            >
              원하는 위치를 검색해보세요
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SearchLocationInputCard',
  data: () => ({
    address: '',
  }),
  computed: {
    ...mapGetters('weather', ['forecastDaily4DaysData']),
    ...mapGetters('user', ['nickname']),
  },
  methods: {
    setDaumPostcodePopupVisible() {
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
</script>
