import { getLocationName, getWeahterDataFetch } from '@/apis/weather'
import { alert } from '@/lib'
import getCurrentLocation from '@/utils/geolocation'

export default {
  updateCurrentName({ commit }, payload) {
    const { name, number1 } = payload.land
    const { area1, area2 } = payload.region
    const currenName = `${area1.name} ${area2.name} ${name} ${number1}`
    commit('updateCurrentName', { name: currenName })
  },
  async defaultLocationUpdate({ getters, commit }) {
    const fetchs = (coords) => [getWeahterDataFetch(coords), getLocationName(coords)]
    const { lat, lon } = getters.currentCoords
    try {
      const settledResult = await Promise.allSettled(fetchs({ lat, lon }))
      const isReject = settledResult.some((result) => result.status === 'rejected')
      if (isReject) {
        throw Error('통신 실패')
      }
      const { current, daily, hourly } = settledResult[0].value.data
      commit('updateCurrentWeatherData', { current, daily, hourly })
      const { land, region } = settledResult[1].value.data.results[0]
      const { name, number1 } = land
      const { area1, area2 } = region
      const currenName = `${area1.name} ${area2.name} ${name} ${number1}`
      commit('updateCurrentName', { name: currenName })
    } catch (error) {
      alert.error(error.message, '통신을 실패했습니다.')
    }
  },
  async currentLocationUpdate({ commit, dispatch }) {
    const fetchs = (coords) => [getWeahterDataFetch(coords), getLocationName(coords)]
    try {
      const currentCoord = await getCurrentLocation()
      commit('updateCurrentCoord', currentCoord)
      const settledResult = await Promise.allSettled(fetchs(currentCoord))
      const isReject = settledResult.some((result) => result.status === 'rejected')
      if (isReject) {
        throw Error('통신 실패')
      }
      const { current, daily, hourly } = settledResult[0].value.data
      commit('updateCurrentWeatherData', { current, daily, hourly })
      const { land, region } = settledResult[1].value.data.results[0]
      const { name, number1 } = land
      const { area1, area2 } = region
      const currenName = `${area1.name} ${area2.name} ${name} ${number1}`
      commit('updateCurrentName', { name: currenName })
    } catch (error) {
      if (error.message === 'User denied Geolocation') {
        alert.error('위치 엑세스 차단', '위치 엑세스가 차단되었습니다. <br/>허용해주세요<br/>기본 위치의 날씨를 보여줍니다.')
        dispatch('defaultLocationUpdate')
      }
      alert.error(error.message, '통신을 실패했습니다.<br/>기본 위치의 날씨를 보여줍니다.')
      dispatch('defaultLocationUpdate')
    }
  },
  async locationGetData({ commit }, payload) {
    const { coords, name } = payload
    try {
      const { data } = await getWeahterDataFetch(coords)
      commit('updateLocationCoord', { ...coords, name })
      commit('updateLocationData', data)
    } catch (error) {
      alert.error('통신 실패', error.message)
    }
  },
}
