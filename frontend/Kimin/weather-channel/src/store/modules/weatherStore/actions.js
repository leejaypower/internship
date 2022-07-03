import { callCurrentLocation } from '@/utils/callAPI'
import { divideArray } from '@/utils'
import {
  getFiveDaysWeather,
  getCurrentWeatherAPI,
  getGeocodeByQuery,
  getReverseGeocode,
  makeWeatherInfo,
} from '@/services/weather'
import { validateCoordinate } from '@/services/validation'
import errorMessageMap from '@/services/errorHandling'

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
    validateCoordinate(coords.latitude, coords.longitude)
    commit('saveTempLocation', location)
  } catch (error) {
    dispatch('snackBarStore/alertMessage', { text: '현 위치를 찾지 못하였습니다.', color: 'pink' }, { root: true })
  }
}

/**
 * services에 위치한 reverseGeocodeAPI를 호출하는 함수
 * 좌표 변수에 의해 주소값 리턴
 */
const getAddressByGeocode = async ({ dispatch }, coordinate) => {
  try {
    const { lat, lon } = coordinate
    validateCoordinate(lat, lon)
    const foundedAddress = await getReverseGeocode(lat, lon)
    return foundedAddress
  } catch (error) {
    dispatch('snackBarStore/alertMessage', { text: '설정된 주소에 오류가 있습니다.', color: 'pink' }, { root: true })
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
    validateCoordinate(lat, lon)
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
    dispatch('snackBarStore/alertMessage', { text: '서버에 오류가 있습니다.', color: 'pink' }, { root: true })
  }
  return null
}

const findAddress = async ({ dispatch }, query) => {
  try {
    const { fullAddress, coordinate } = await getGeocodeByQuery(query)
    return { fullAddress, coordinate }
  } catch (error) {
    dispatch('snackBarStore/alertMessage', errorMessageMap(error), { root: true })
    return ''
  }
}

const getMultiWeathers = async ({ dispatch, commit }, cities) => {
  try {
    commit('initializeMultiWeathers')
    const dividedArray = divideArray(cities, 3)
    // 병렬통신을 위해 한번에 6개의 통신수가 가장 적정하다고 생각되며, 도시 1개당 통신 2종의 통신이 사용되기에 3개씩 분할

    for (let i = 0; i < dividedArray.length; i += 1) {
      const promises = dividedArray[i].map((city) => makeWeatherInfo(city))
      // eslint-disable-next-line
      const results = await Promise.all(promises)
      commit('saveCitiesWeatherInfo', results)
    }
  } catch (error) {
    dispatch('snackBarStore/alertMessage', { text: '날씨조회서버에 오류가 있습니다.', color: 'pink' }, { root: true })
  }
}

const actions = {
  getAddressByGeocode,
  getCoordinate,
  getCurrentWeather,
  findAddress,
  getMultiWeathers,
}

export default actions
