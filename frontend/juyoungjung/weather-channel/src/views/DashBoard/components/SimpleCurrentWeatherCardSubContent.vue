<template>
  <div>
    <v-list-item>
      <v-list-item-icon>
        <v-icon color="light-blue">
          mdi-thermometer-plus
        </v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        체감온도 {{ simpleCurrentWeatherData.feels_like }}
      </v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon color="light-blue">
          mdi-send
        </v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        풍속 {{ simpleCurrentWeatherData.wind_speed }}
      </v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon color="light-blue">
          mdi-water
        </v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        강수량 {{ simpleCurrentWeatherData.rain || '0mm/h' }}
      </v-list-item-subtitle>
    </v-list-item>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SimpleCurrentWeatherCardSubContent',
  computed: {
    ...mapGetters('weather', [
      'simpleCurrentWeatherData',
    ]),
  },
}
</script>
