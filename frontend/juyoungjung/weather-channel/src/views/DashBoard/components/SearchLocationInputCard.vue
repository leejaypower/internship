<template>
  <v-card class="my-2">
    <v-skeleton-loader
      v-if="!forecastDaily4DaysList"
      class="pa-6"
      height="100"
      type="paragraph"
    />

    <div v-else>
      <v-row
        class="py-3 d-flex justify-center align-center"
      >
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center align-center text-center"
        >
          <span
            v-if="nickname"
            class="mb-2"
          >현재 {{ nickname }}님이 계신 곳이 아닌<br> 다른 지역의 날씨정보를 알고 싶으신가요?</span>

          <span v-else>현재 계신 곳이 아닌<br> 다른 지역의 날씨정보를 알고 싶으신가요?</span>
        </v-col>
        <v-col
          md="6"
          class="d-flex justify-center align-center"
        >
          <v-btn
            color="light-blue"
            outlined
            @click="setDaumPostcodePopupVisibleMixin"
          >
            원하는 위치를 검색해보세요
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { daumPostcodeMixin } from '@/mixins'

export default {
  name: 'SearchLocationInputCard',
  mixins: [daumPostcodeMixin],
  computed: {
    ...mapGetters('weather', ['forecastDaily4DaysList']),
    ...mapGetters('user', ['nickname']),
  },
}
</script>
