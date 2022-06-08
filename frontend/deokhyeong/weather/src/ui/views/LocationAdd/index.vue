<template>
  <div
    class="d-flex flex-column full-height"
  >
    <circular-loading
      v-if="isLoading"
    />
    <div
      v-else
      class="d-flex flex-column pa-10"
    >
      <title-header title="위치 추가" />
      <div>
        <v-icon
          x-large
          color="#2196F3"
          @click="handleBackArrow"
        >
          mdi-arrow-left
        </v-icon>
      </div>
      <div
        class="py-10"
      >
        <div class="pb-12">
          <div class="pb-2 pl-1">
            <span class="text-h5 font-weight-bold">시 / 도</span>
          </div>
          <v-chip-group
            column
          >
            <v-chip
              v-for="siOrDo in siOrDoList"
              :key="siOrDo.id"
              active-class="deep-purple accent-4 white--text"
              :input-value="selectedSiOrDo === siOrDo.name"
              @click="selectSiAndDo(siOrDo.name)"
            >
              {{ siOrDo.name }}
            </v-chip>
          </v-chip-group>
        </div>
        <div
          v-if="guList.length"
          class="pb-12"
        >
          <div class="pb-2 pl-1">
            <span class="text-h5 font-weight-bold">구</span>
          </div>
          <v-chip-group
            column
          >
            <v-chip
              v-for="gu in guList"
              :key="gu.id"
              active-class="deep-purple accent-4 white--text"
              :input-value="selectedGu === gu.name"
              @click="selectGu(gu.name)"
            >
              {{ gu.name }}
            </v-chip>
          </v-chip-group>
        </div>
        <div
          v-if="isSiAndGuSelected"
          class="d-flex justify-center"
        >
          <v-btn
            class="primary"
            @click="onAddLocation"
          >
            추가하기
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import locationApi from '@/service/api/location'
import { mapActions, mapGetters } from 'vuex'
import TitleHeader from '@/ui/components/TitleHeader'
import CircularLoading from '@/ui/components/CircularLoading'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'LocationAdd',
  components: { TitleHeader, CircularLoading },
  data() {
    return {
      siGuNameMap: {},
      siOrDoList: [],
      guList: [],
      siGuLatLong: {},
      selectedSiOrDo: '',
      selectedGu: '',
    }
  },
  computed: {
    ...mapGetters('loading', ['isLoading']),
    isSiAndGuSelected() {
      return this.selectedSiOrDo && this.selectedGu
    },
  },
  async created() {
    this.turnOnLoading()
    await this.fetchInitLocation()
    this.turnOffLoading()
  },
  methods: {
    ...mapActions('auth', ['addNewLocation']),
    ...mapActions('loading', ['turnOnLoading', 'turnOffLoading']),
    ...mapActions('alert', ['alertOpen']),
    handleBackArrow() {
      this.$router.back()
    },
    initInfo() {
      this.siGuNameMap = {}
      this.siOrDoList = []
      this.guList = []
      this.siGuLatLong = {}
      this.selectedSiOrDo = ''
      this.selectedGu = ''
    },
    selectSiAndDo(siOrDo) {
      if (siOrDo === this.selectedSiOrDo) {
        this.selectedSiOrDo = ''
        this.guList = []
        this.selectedGu = ''
        return
      }
      this.selectedSiOrDo = siOrDo
      this.guList = this.siGuNameMap[siOrDo].map(
        (gu) => ({ id: uuidv4(), name: gu }),
      )
      this.selectedGu = ''
    },
    selectGu(gu) {
      if (this.selectedGu === gu) {
        this.selectedGu = ''
        return
      }
      this.selectedGu = gu
    },
    async onAddLocation() {
      const searchKey = `${this.selectedSiOrDo}/${this.selectedGu}`
      const newLocation = {
        location: searchKey,
        lat: this.siGuLatLong[searchKey].lat,
        long: this.siGuLatLong[searchKey].long,
      }
      const response = await this.addNewLocation({ newLocation })
      if (response.status === 200) {
        this.initInfo()
        this.$router.back()
      }
    },
    async setKoreaAdministrativeDistrict() {
      try {
        const koreaAdministrativeDistrict = await locationApi.getKoreaAdministrativeDistrict()
        this.koreaAdministrativeDistrictList = koreaAdministrativeDistrict.data.siGuList
        this.siGuNameMap = this.koreaAdministrativeDistrictList.reduce(
          (prev, cur) => ({ ...prev, ...cur }),
          {},
        )
        this.siOrDoList = Object.keys(this.siGuNameMap).map(
          (siGuName) => ({ id: uuidv4(), name: siGuName }),
        )
      } catch (error) {
        this.alertOpen({ status: error.status, message: error.data.message })
      }
    },
    async setSigunguLocation() {
      try {
        const sigunguLocation = await locationApi.getSigunguLocation()
        this.siGuLatLong = sigunguLocation.data.siGuLocation
      } catch (error) {
        this.alertOpen({ status: error.status, message: error.data.message })
      }
    },
    async fetchInitLocation() {
      const koreaAdministrativeDistrict = this.setKoreaAdministrativeDistrict()
      const sigunguLocation = this.setSigunguLocation()
      await Promise.allSettled([koreaAdministrativeDistrict, sigunguLocation])
    },
  },
}
</script>
