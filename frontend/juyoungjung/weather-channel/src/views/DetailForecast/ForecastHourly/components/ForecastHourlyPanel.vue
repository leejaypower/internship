<template>
  <v-container>
    <v-expansion-panels focusable>
      <v-expansion-panel
        v-for="data in hourlyData"
        :key="data.time"
      >
        <v-expansion-panel-header>
          <v-row class="d-flex align-center">
            <v-col
              cols="4"
              md="2"
              class="d-flex justify-center"
            >
              <span>{{ data.date }}{{ data.day }}</span>
            </v-col>

            <v-col
              cols="4"
              md="2"
              class="d-flex justify-center"
            >
              <span>{{ data.hour }}</span>
            </v-col>

            <v-col
              cols="4"
              md="2"
              class="d-flex justify-center"
            >
              <div>
                <v-img
                  :src="$_makeIconUrl(data.icon)"
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
              <span><v-icon
                class="mr-3"
                color="light-blue"
              >mdi-thermometer-plus</v-icon> {{ data.temp }}</span>
            </v-col>

            <v-col
              cols="4"
              md="2"
              class="d-flex justify-center"
            >
              <span><v-icon
                class="mr-3"
                color="light-blue"
              >mdi-water</v-icon> {{ data.rain || '0mm/h' }}</span>
            </v-col>

            <v-col
              cols="4"
              md="2"
              class="d-flex justify-center"
            >
              <span><v-icon
                class="mr-3"
                color="light-blue"
              >mdi-send</v-icon> {{ data.wind }}</span>
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-card class="mt-10">
            <v-simple-table>
              <template #default>
                <tbody>
                  <tr>
                    <today-weather-table-td
                      :content="data.feels_like"
                      :icon="'mdi-thermometer-plus'"
                      :label="'체감 온도'"
                    />
                    <today-weather-table-td
                      :content="data.rain || '0mm/h'"
                      :icon="'mdi-water'"
                      :label="'강수량'"
                    />
                  </tr>

                  <tr>
                    <today-weather-table-td
                      :content="data.humidity"
                      :icon="'mdi-water-percent'"
                      :label="'습도'"
                    />
                    <today-weather-table-td
                      :content="data.uvi"
                      :icon="'mdi-water-percent'"
                      :label="'자외선 지수'"
                    />
                  </tr>

                  <tr>
                    <today-weather-table-td
                      :content="data.wind"
                      :icon="'mdi-send'"
                      :label="'풍속'"
                    />
                    <today-weather-table-td
                      :content="data.clouds"
                      :icon="'mdi-cloud-outline'"
                      :label="'구름량'"
                    />
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { openWeatherMapIconMixin } from '@/mixins'
import TodayWeatherTableTd from '../../components/TodayWeatherTableTd.vue'

export default {
  name: 'ForecastHourlyPanel',
  components: { TodayWeatherTableTd },
  mixins: [openWeatherMapIconMixin],
  props: {
    hourlyData: {
      type: Array,
      default: null,
    },
  },
}
</script>
