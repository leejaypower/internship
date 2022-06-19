<template>
  <v-expansion-panel-header>
    <v-row class="d-flex align-center">
      <v-col
        cols="4"
        md="2"
        class="d-flex justify-center"
      >
        <span>{{ forecastData.date }}{{ forecastData.day }}</span>
      </v-col>

      <v-col
        cols="4"
        md="2"
        class="d-flex justify-center"
      >
        <span>{{ forecastData.hour }}</span>
      </v-col>

      <v-col
        cols="4"
        md="2"
        class="d-flex justify-center"
      >
        <div>
          <v-img
            :src="makeIconUrlMixin(forecastData.icon)"
            alt="weather icon"
            width="60"
          />
        </div>
      </v-col>

      <v-col
        cols="4"
        md="2"
        class="d-flex justify-center"
      >
        <span>
          <v-icon
            class="mr-3"
            color="light-blue"
          >
            mdi-thermometer-plus
          </v-icon>
          {{ forecastData.temp }}
        </span>
      </v-col>

      <v-col
        cols="4"
        md="2"
        class="d-flex justify-center"
      >
        <span>
          <v-icon
            class="mr-3"
            color="light-blue"
          >mdi-water
          </v-icon>
          {{ forecastData.rain || '0mm/h' }}
        </span>
      </v-col>

      <v-col
        cols="4"
        md="2"
        class="d-flex justify-center"
      >
        <span>
          <v-icon
            class="mr-3"
            color="light-blue"
          >mdi-send
          </v-icon>
          {{ forecastData.wind }}
        </span>
      </v-col>
    </v-row>
  </v-expansion-panel-header>
</template>

<script>
import { openWeatherMapIconMixin } from '@/mixins'

export default {
  name: 'ForecastHourlyPanelHeader',
  mixins: [openWeatherMapIconMixin],
  props: {
    forecastData: {
      type: Object,
      default: () => null,
    },
  },
}
</script>
