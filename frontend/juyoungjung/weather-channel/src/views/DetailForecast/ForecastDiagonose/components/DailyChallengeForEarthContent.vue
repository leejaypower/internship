<template>
  <v-row>
    <v-col
      v-for="(list, i) in cardInfoList"
      :key="`daily-challenge-for-earth-image-${i}`"
      cols="12"
      sm="6"
      md="4"
      class="d-flex justify-center align-center"
    >
      <daily-challenge-for-earth-card
        :src="list.src"
        :alt="list.alt"
        :title="list.title"
        :threshold="i/10"
      />
    </v-col>
  </v-row>
</template>
<script>
import { dailyChallengeForEarthCardList } from '@/data'
import DailyChallengeForEarthCard from './DailyChallengeForEarthCard.vue'

export default {
  name: 'DailyChallengeForEarthContent',
  components: { DailyChallengeForEarthCard },
  data: () => ({
    cardInfoList: dailyChallengeForEarthCardList,
  }),
}
</script>
