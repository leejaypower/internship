<template>
  <div class="test-logging-page">
    <v-card
      width="100vw"
      height="50%"
    >
      <v-container>
        <v-row
          v-for="(row,i) in testSamples"
          :key="i"
        >
          <v-col>
            {{ row.name }}
          </v-col>
          <v-col>
            {{ row.contents }}
          </v-col>
          <v-col>
            <v-btn
              v-show="row.name !== '이름'"
              @click="row.handler"
            >
              실행
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div class="table-container">
      <v-card
        height="100%"
      >
        <v-data-table
          class="error-table"
          :headers="logTableHeader"
          :items="logTableContents"
        >
          <template #[`item.user`]="{ value }">
            <div
              class="text-truncate"
              style="max-width: 100px"
            >
              {{ value }}
            </div>
          </template>
          <template #[`item.message`]="{ value }">
            <div
              class="text-truncate"
              style="max-width: 100px"
            >
              {{ value }}
            </div>
          </template>
          <template #[`item.responseURL`]="{ value }">
            <div
              class="text-truncate"
              style="max-width: 250px"
            >
              {{ value }}
            </div>
          </template>
          <template #[`item.response`]="{ value }">
            <div
              class="text-truncate"
              style="max-width: 250px"
            >
              {{ value }}
            </div>
          </template>
          <template #[`item.stack`]="{ value }">
            <div
              class="text-truncate"
              style="max-width: 250px"
            >
              {{ value }}
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import { ERROR_TABLE_HEADERS } from '@/constants'
import { mapActions } from 'vuex'

export default {
  name: 'TestLogging',
  data() {
    return {
      logTableHeader: ERROR_TABLE_HEADERS,
    }
  },
  computed: {
    testSamples() {
      return [
        {
          no: '순번',
          name: '이름',
          contents: '내용',
          handler: () => {},
        },
        {
          no: '1',
          name: 'openWeather 통신에러1',
          contents: '좌표 불량',
          handler: this.apiTestOne,
        },
        {
          no: '2',
          name: 'Vue 에러',
          contents: '컴포넌트에서 발생한 에러',
          handler: this.apiTestTwo,
        },
        {
          no: '3',
          name: '네이버 GeoCode 통신에러',
          contents: 'query 불량',
          handler: this.apiTestThree,
        },
      ]
    },
    logTableContents() {
      return this.getSavedLogs
    },
    getSavedLogs() {
      return this.$store.getters['errorStore/getsavedLogs']
    },
  },
  methods: {
    ...mapActions('weatherStore', ['getMultiWeathers', 'findAddress']),
    apiTestOne() {
      this.getMultiWeathers([{
        name: '테스트도시',
        lat: '12121',
        lon: 'abc',
      }])
    },
    apiTestTwo() {
      throw new Error('테스트에러')
    },
    apiTestThree() {
      this.findAddress('존재하지않는도시')
    },
  },
}
</script>

<style scoped>

  .test-logging-page > .error-table {
    font-size: 8px !important;
    padding: 1px !important;
    height: 30px !important;
  }
  .table-container{
    width:100vw;
    height: 47%;
    overflow: auto;
  }
</style>
