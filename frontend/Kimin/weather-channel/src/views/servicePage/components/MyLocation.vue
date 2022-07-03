<template>
  <span
    v-if="cityNameShow"
    class="d-flex justify-end text-caption"
  >
    {{ `${today} ${time}, ${cityName}` }}
  </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import vueMoment from 'vue-moment'

Vue.use(vueMoment)
export default {
  name: 'MyLocation',
  data() {
    return {
      cityName: '',
      cityNameShow: false,
      today: this.$moment().format('MM/DD'),
      time: this.$moment().format('HH시'),
    }
  },
  computed: {
    ...mapGetters('weatherStore', ['getReferenceCoordinate']),
    location() {
      return this.getReferenceCoordinate
    },
  },
  watch: {
    async location(value) {
      if (value.lat && value.lon) {
        this.cityName = await this.getAddressByGeocode(this.location)
        this.cityNameShow = true
      }
    },
  },
  async mounted() {
    if (this.location.lat && this.location.lon) {
      this.cityName = await this.getAddressByGeocode(this.location)
      this.cityNameShow = true
    }
  },
  methods: {
    ...mapActions('weatherStore', ['getAddressByGeocode']),
  },
}
</script>
