<template>
  <v-lazy
    :options="{
      threshold:threshold
    }"
    transition="scale-transition"
  >
    <v-card
      rounded="circle"
      width="300"
      height="300"
      class="overflow-hidden"
    >
      <v-img
        height="190"
        :src="require(`@/assets/images/${src}`)"
        :alt="alt"
        transition="slide-x-transition"
      />

      <v-row>
        <v-col class="d-flex justify-center">
          <v-card-subtitle>
            {{ title }}
          </v-card-subtitle>
        </v-col>
      </v-row>
    </v-card>
  </v-lazy>
</template>
<script>

export default {
  name: 'DailyChallengeForEarthCard',
  props: {
    src: {
      type: String,
      default: 'buy-local-food.png',
    },
    alt: {
      type: String,
      default: 'buy-local-food.png',
    },
    title: {
      type: String,
      default: '지역에서 생산된 제품 사기',
    },
    threshold: {
      type: Number,
      default: 0,
    },
  },
}
</script>
