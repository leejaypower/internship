<template>
  <div class="d-flex flex-column pa-4 full-height">
    <div>
      <title-header
        title="에러 테스트"
      />
      <div v-if="isRenderErrorView">
        {{ testMap.dep1.dep2.x.y }}
      </div>
    </div>
    <v-row
      align="center"
      justify="space-around"
    >
      <v-btn
        color="green"
        @click="handleTypeError"
      >
        타입에러
      </v-btn>
      <v-btn
        color="primary"
        @click="handleRender"
      >
        렌더링 에러
      </v-btn>
      <v-btn
        color="yellow"
        @click="handleApiError"
      >
        API 에러
      </v-btn>
      <v-btn
        color="orange"
        @click="handleBroswerError"
      >
        브라우저 에러
      </v-btn>
    </v-row>
    <bottom-navigation />
  </div>
</template>
<script>
import TitleHeader from '@/ui/components/TitleHeader'
import BottomNavigation from '@/ui/components/layout/BottomNavigation'
import { mapActions } from 'vuex'

export default {
  name: 'ErrorTest',
  components: { TitleHeader, BottomNavigation },
  data() {
    return {
      isRenderErrorView: false,
      testMap: {
        dep1: {
          str: 'dep1',
          dep2: {
            str: 'dep2',
            dep3: {
              str: 'dep3',
            },
          },
        },
      },
    }
  },
  methods: {
    ...mapActions('weather', ['currentWeatherSetting']),
    handleRender() {
      this.isRenderErrorView = !this.isRenderErrorView
    },
    handleTypeError() {
      this.testMap = this.testMap.dep1.x.k
    },
    handleApiError() {
      this.currentWeatherSetting({})
    },
    handleBroswerError() {
      let callCount = 0
      const intervalId = setInterval(() => {
        if (callCount === 1) {
          return clearInterval(intervalId)
        }
        callCount += 1
        throw new Error('broswer Error test 만들기')
      }, 0)
    },
  },
}
</script>
