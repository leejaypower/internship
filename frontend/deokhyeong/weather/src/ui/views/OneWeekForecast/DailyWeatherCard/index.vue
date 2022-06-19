<template>
  <v-card
    class="d-flex align-center mb-4"
    :class="cardSizeClass"
  >
    <v-row
      align="center"
    >
      <v-col
        cols="3"
        class="text-center font-weight-medium"
        :class="dayNameSizeClass"
      >
        <div>
          <span>
            {{ isToday ? '오늘 날씨' : dayName }}
          </span>
        </div>
      </v-col>
      <v-col
        cols="3"
      >
        <div>
          <img
            class="pt-2"
            :src="weatherIcon"
            alt="날씨 아이콘"
            :width="iconWidthSize"
          >
        </div>
      </v-col>
      <v-col
        cols="6"
        class="text-end font-weight-medium"
        :class="tempFontSizeClass"
      >
        <div>최저 : {{ minTemperature }}&deg;C</div>
        <div>최고 : {{ maxTemperature }}&deg;C</div>
        <v-btn
          v-if="isMoveToDetailButtonView"
          :small="$vuetify.breakpoint.width >= 320"
          :x-small="$vuetify.breakpoint.width < 320"
          @click="$emit('moveToDetail')"
        >
          자세히 보기
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: 'DailyWeatherCard',
  props: {
    dayWeather: {
      type: Object,
      default: () => ({}),
    },
    isToday: {
      type: Boolean,
      default: false,
    },
    isMoveToDetailButtonView: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dayName() {
      return this.dayWeather?.dayName || '-'
    },
    maxTemperature() {
      return this.dayWeather?.maxTemperature || '-'
    },
    minTemperature() {
      return this.dayWeather?.minTemperature || '-'
    },
    weatherIcon() {
      return this.dayWeather?.weatherIcon || 'images/no-result.png'
    },
    cardSizeClass() {
      if (this.$vuetify.breakpoint.width < 320) {
        return {
          'pa-4': true,
        }
      }

      return {
        'px-4': true,
      }
    },
    iconWidthSize() {
      if (this.$vuetify.breakpoint.width < 320) {
        return 50
      }
      if (this.$vuetify.breakpoint.width < 500) {
        return 80
      }
      return 120
    },
    dayNameSizeClass() {
      if (this.$vuetify.breakpoint.width < 500) {
        return {
          'text-subtitle-1': true,
        }
      }

      return {
        'text-h5': true,
      }
    },
    tempFontSizeClass() {
      if (this.$vuetify.breakpoint.width < 320) {
        return { caption: true }
      }
      if (this.$vuetify.breakpoint.width < 500) {
        return { 'text-subtitle-2': true }
      }

      return {
        'text-h6': true,
      }
    },
  },
}
</script>
