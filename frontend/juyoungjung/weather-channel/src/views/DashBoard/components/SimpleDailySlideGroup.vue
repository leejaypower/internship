<template>
  <v-sheet
    class="mx-auto py-5 d-flex justify-center align-center overflow-hidden"
    max-width="800"
  >
    <v-slide-group
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="data in forecastDaily4DaysList"
        :key="data.key"
      >
        <simple-daily-slide-card :forecast-data="data" />
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
import { mapGetters } from 'vuex'
import SimpleDailySlideCard from './SimpleDailySlideCard.vue'

export default {
  name: 'SimpleDailySlideGroup',
  components: { SimpleDailySlideCard },
  computed: {
    ...mapGetters('weather', ['forecastDaily4DaysList']),
  },
}
</script>
