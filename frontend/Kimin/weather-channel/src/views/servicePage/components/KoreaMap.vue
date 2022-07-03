<template>
  <svg
    viewBox="-100 0 900 1200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="dropshadow">
        <feGaussianBlur
          in="SourceAlpha"
          stdDeviation="3"
        />
        <feOffset
          dx="2"
          dy="2"
          result="offsetblur"
        />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#dropshadow)">
      <path
        v-for="(svg) in MAP_SVG_SRC"
        :id="svg.id"
        :key="svg.id"
        :fill="svg.fill"
        :d="svg.d"
        :class="pathClass(svg.id)"
        @mouseover="hoverArea(svg.id)"
        @focus="hoverArea(svg.id)"
        @mouseleave="leaveArea"
        @focusout="leaveArea"
      /></g>
    <g filter="url(#dropshadow)">
      <text
        v-for="text in MAP_TEXT_SRC"
        :id="text.id"
        :key="text.id"
        class="TEXT"
        :x="text.x"
        :y="text.y"
      >{{ text.text }}</text>
    </g>
  </svg>
</template>

<script>
import { MAP_SVG_SRC, MAP_TEXT_SRC } from '@/constants'
import { CITY_NAME_AND_CODE_MAP } from '@/services/weather'
import { deepClone } from '@/utils'

export default {
  name: 'KoreaMap',
  props: {
    selectedCityId: {
      type: String,
      default: null,
    },
    getCitiesWeatherInfo: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      MAP_SVG_SRC: deepClone(MAP_SVG_SRC),
      MAP_TEXT_SRC,
      beginning: true,
    }
  },
  watch: {
    getCitiesWeatherInfo(value) {
      value.forEach((weatherInfo) => {
        const cityID = CITY_NAME_AND_CODE_MAP[`${weatherInfo.name}`]
        const citySvgPath = this.MAP_SVG_SRC.find((path) => path.id === cityID)
        citySvgPath.fill = weatherInfo.fill
      })
    },
  },
  mounted() {
    setTimeout(() => {
      this.beginning = false
    }, 3000)
  },
  methods: {
    hoverArea(id) {
      this.$emit('markHoveredCity', id)
    },
    leaveArea() {
      this.$emit('removeHoveredCity')
    },
    pathClass(id) {
      const transitionProperty = this.beginning ? 'lazyTransition' : 'quickTransition'
      const hoveredProperty = id === this.selectedCityId ? 'hoveredCity' : ''
      return `${transitionProperty} ${hoveredProperty}`
    },
  },
}
</script>

<style scoped>
  svg{
    width: 30vw;
  }
  .lazyTransition{
    transition: 2500ms;
  }
  .quickTransition{
    transition: 100ms;
  }
  path:hover{
    fill:yellow;
    cursor: pointer;
  }
  .hoveredCity{
    fill:yellow;
  }
</style>
