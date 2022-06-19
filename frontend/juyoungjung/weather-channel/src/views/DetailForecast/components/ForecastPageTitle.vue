<template>
  <v-row class="d-flex align-center justify-space-between mx-6 py-16">
    <v-col
      cols="12"
      lg="6"
    >
      <h1>{{ title }}</h1>
      <h5 class="grey--text">
        {{ subTitle }}
      </h5>
    </v-col>
    <v-col
      v-if="currentLocation"
      cols="8"
      lg="4"
    >
      <h3><span class="blue-grey--text">현재 위치</span> {{ currentLocation }}</h3>
    </v-col>

    <v-col
      v-if="currentLocation"
      cols="4"
      lg="2"
    >
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            class="mr-6"
            color="blue"
            outlined
            fab
            x-small
            :attrs="attrs"
            @click="setDaumPostcodePopupVisibleMixin"
            v-on="on"
          >
            <v-icon>mdi-target</v-icon>
          </v-btn>
        </template>
        <span>다른 지역의 날씨를 찾아보세요.</span>
      </v-tooltip>

      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            color="red"
            outlined
            fab
            x-small
            :attrs="attrs"
            @click="setForecastData"
            v-on="on"
          >
            <v-icon>mdi-restore</v-icon>
          </v-btn>
        </template>
        <span>최신 날씨 현황을 가져옵니다.</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>
<script>
import { daumPostcodeMixin } from '@/mixins'
import { mapGetters } from 'vuex'

export default {
  name: 'ForecastPageTitle',
  mixins: [daumPostcodeMixin],
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters('weather', [
      'currentLocation', 'currentCoords',
    ]),
  },
  methods: {
    setForecastData() {
      this.$store.dispatch('weather/getOneCallApi', this.currentCoords)
    },
  },
}
</script>
