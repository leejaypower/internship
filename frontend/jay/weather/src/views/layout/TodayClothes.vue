<template>
  <v-col
    cols="12"
    lg="2"
    md="2"
    sm="10"
  >
    <v-sheet
      rounded="lg"
      min-height="268"
      class="pa-2"
    >
      <v-skeleton-loader
        v-if="!temperature"
        type="article"
      />
      <v-row
        v-else
        class="pa-5 pa-md-1 pa-lg-5 text-center"
      >
        <div class="wrapper">
          <p>현재 온도</p> : <p><b>{{ temperature }}℃</b></p><br>
          <h3 class="mb-4">
            추천 옷차림
          </h3>
          <div
            v-for="item in todayClothes"
            :key="item.name"
            class="clothes ma-2 d-inline-block text-center pa-2"
          >
            <img
              :src="require(`@/assets/clothesIcon/${item.src}`)"
              alt="옷 아이콘"
            >
            <br>
            <p class="mb-0">
              {{ item.name }}
            </p>
          </div>
        </div>
      </v-row>
    </v-sheet>
  </v-col>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import clothes from '@/util/clothes'

const { mapGetters } = createNamespacedHelpers('weatherStore')

export default {
  data: () => ({
    todayClothes: [],
  }),
  computed: {
    ...mapGetters(['temperature']),
  },
  watch: {
    temperature(value) {
      this.todayClothes = this.getDress(Math.round(value))
    },
  },
  methods: {
    getDress(temperature) {
      return clothes
        .filter((item) => item.minTemp <= temperature && temperature <= item.maxTemp)
    },
  },
}
</script>

<style scoped>

h3{
  font-weight: 200;
}

p{
  display: inline-block;
  font-weight: 200;
}

img{
  width:100%;
  max-width: 5em
}

.wrapper{
  padding: 14px;
  margin: auto;
}

.clothes{
  border: 1px solid lightgrey;
  border-radius: 10px;
}

</style>
