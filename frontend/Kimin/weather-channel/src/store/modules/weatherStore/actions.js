import { callCurrentLocation } from '@/utils/callAPI'
import {
  getFiveDaysWeather,
  getCurrentWeatherAPI,
  getGeocodeByQuery,
  getReverseGeocode,
} from '@/services/weather'

/**
 *
 * @param {*} param0
 * @param {String} 행정구역명
 * @returns coordinate {lat, lon}
 */
const setMyCoordinate = async (_, address) => {
  const coords = await getGeocodeByQuery(address)
  return coords
}

/**
 * services에 위치한 geoLocationAPI를 호출하는 함수
 * store에 임시좌표를 저장하기위해 mutations를 호출
 */
const getCoordinate = async ({ dispatch, commit }) => {
  try {
    const coords = await callCurrentLocation()
    const location = {
      lat: coords.latitude,
      lon: coords.longitude,
    }
    commit('saveTempLocation', location)
  } catch (error) {
    dispatch('alertMessage', { text: '현 위치를 찾지 못하였습니다.', color: 'pink' }, { root: true })
  }
}

/**
 * services에 위치한 reverseGeocodeAPI를 호출하는 함수
 * 좌표 변수에 의해 주소값 리턴
 */
const getAddressByGeocode = async ({ dispatch }, coordinate) => {
  try {
    const { lat, lon } = coordinate
    const foundedAddress = await getReverseGeocode(lat, lon)
    return foundedAddress
  } catch (error) {
    dispatch('alertMessage', { text: '설정된 주소에 오류가 있습니다.', color: 'pink' }, { root: true })
    return ''
  }
}

const getCurrentWeather = async ({ dispatch, commit, getters }) => {
  const location = getters.getReferenceCoordinate
  if (!location.lat || !location.lon) {
    return null
  }
  try {
    const { lat, lon } = location
    const currentWeatherResult = getCurrentWeatherAPI(lat, lon)
    const futureWeatherResult = getFiveDaysWeather(lat, lon)
    const results = await Promise.allSettled([futureWeatherResult, currentWeatherResult])

    results.forEach((result) => {
      if (result.status !== 'fulfilled') {
        throw new Error()
      }
    })
    const currentWeather = results[1].value
    const { fiveDaysWeather, oneDayWeather } = results[0].value

    commit('saveCurrentWeather', currentWeather)
    commit('saveMultiDaysWeather', fiveDaysWeather)
    commit('saveMultiTimeWeather', oneDayWeather)
  } catch (error) {
    dispatch('alertMessage', { text: '서버에 오류가 있습니다.', color: 'pink' }, { root: true })
  }
  return null
}

const findAddress = async ({ dispatch }, query) => {
  try {
    const { fullAddress, coordinate } = await getGeocodeByQuery(query)
    return { fullAddress, coordinate }
  } catch (error) {
    if (error.message === 'Invalid Query') {
      dispatch('alertMessage', { text: '잘못된 검색어입니다.', color: 'pink' }, { root: true })
      return ''
    }
    dispatch('alertMessage', { text: '알수없는 오류입니다.', color: 'pink' }, { root: true })
    return ''
  }
}

const actions = {
  getAddressByGeocode,
  getCoordinate,
  getCurrentWeather,
  setMyCoordinate,
  findAddress,
}

export default actions
