import fetchMyLocation from '@/util/geolocation'
import fetchMyAddress from '@/util/api/naverReverseGeocoding'

export default {
  namespaced: true,
  state: {
    gettingLocation: false,
    lat: '37.5170845089',
    lon: '127.04107099007',
    address: '',
  },
  getters: {
    lat(state) {
      return state.lat
    },
    lon(state) {
      return state.lon
    },
    address(state) {
      return state.address
    },
  },
  mutations: {
    SET_LOCATION(state, location) {
      state.lat = location.latitude
      state.lon = location.longitude
    },
    SET_ADDRESS(state, address) {
      state.address = address
    },
  },
  actions: {
    async fetchLocation({ commit, dispatch }) {
      dispatch('alertStore/setIsLoading', null, { root: true })
      try {
        const response = await fetchMyLocation()
        commit('SET_LOCATION', response)
        dispatch('alertStore/removeIsLoading', null, { root: true })
      } catch (error) {
        dispatch('errorStore/handlePredictableError', { error, errorCode: error.code }, { root: true })
        dispatch('alertStore/removeIsLoading', null, { root: true })
      }
    },
    async fetchAddress({ getters, commit, dispatch }) {
      try {
        const response = await fetchMyAddress(getters.lat, getters.lon)

        if (response.data.status.name === 'no results') {
          const error = new Error('현재 위치의 이름을 불러오지 못했습니다.')
          Object.assign(error, { errorCode: 77 })
          throw error
        }

        const region = `${response.data.results[0].region.area2.name} ${response.data.results[0].region.area3.name}`
        commit('SET_ADDRESS', region)
      } catch (error) {
        dispatch('errorStore/handlePredictableError', { error, errorCode: error.errorCode }, { root: true })
      }
    },
  },
}
