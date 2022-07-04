import { divideArray } from '@/utils'
import {
  getFiveDaysWeather,
  getCurrentWeatherAPI,
  getGeocodeByQuery,
  getReverseGeocode,
  makeWeatherInfo,
  getCurrentLocation,
} from '@/services/weather'
import { validateCoordinates } from '@/services/validation'

/**
 * services에 위치한 geoLocationAPI를 호출하는 함수
 * store에 임시좌표를 저장하기위해 mutations를 호출
 */
const getCoordinate = async ({ dispatch, commit }) => {
  try {
    const coords = await getCurrentLocation()
    const location = {
      lat: coords.latitude,
      lon: coords.longitude,
    }
    validateCoordinates(coords.latitude, coords.longitude)
    commit('saveTempLocation', location)
  } catch (customError) {
    const customErrorObj = JSON.parse(customError.message)
    dispatch('errorStore/recordLog', customErrorObj, { root: true })
    dispatch('snackBarStore/alertMessage', { text: customErrorObj.alertMessage }, { root: true })
  }
}

/**
 * services에 위치한 reverseGeocodeAPI를 호출하는 함수
 * 좌표 변수에 의해 주소값 리턴
 */
const getAddressByGeocode = async ({ dispatch }, coordinate) => {
  try {
    const { lat, lon } = coordinate
    validateCoordinates(lat, lon)
    const foundedAddress = await getReverseGeocode(lat, lon)
    return foundedAddress
  } catch (customError) {
    const customErrorObj = JSON.parse(customError.message)
    dispatch('errorStore/recordLog', customErrorObj, { root: true })
    dispatch('snackBarStore/alertMessage', { text: customErrorObj.alertMessage }, { root: true })
    return ''
  }
}

const getCurrentWeather = async ({ dispatch, commit, getters }) => {
  try {
    const { lat, lon } = getters.getReferenceCoordinate
    validateCoordinates(lat, lon)
    const currentWeatherResult = getCurrentWeatherAPI(lat, lon)
    const futureWeatherResult = getFiveDaysWeather(lat, lon)
    const results = await Promise.all([futureWeatherResult, currentWeatherResult])

    const { fiveDaysWeather, oneDayWeather } = results[0]
    const currentWeather = results[1]

    commit('saveCurrentWeather', currentWeather)
    commit('saveMultiDaysWeather', fiveDaysWeather)
    commit('saveMultiTimeWeather', oneDayWeather)
  } catch (customError) {
    const customErrorObj = JSON.parse(customError.message)
    dispatch('errorStore/recordLog', customErrorObj, { root: true })
    dispatch('snackBarStore/alertMessage', { text: customErrorObj.alertMessage }, { root: true })
  }
  return null
}

const findAddress = async ({ dispatch }, query) => {
  try {
    const { fullAddress, coordinate } = await getGeocodeByQuery(query)
    return { fullAddress, coordinate }
  } catch (customError) {
    const customErrorObj = JSON.parse(customError.message)
    dispatch('errorStore/recordLog', customErrorObj, { root: true })
    dispatch('snackBarStore/alertMessage', { text: customErrorObj.alertMessage }, { root: true })
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
  } catch (customError) {
    const customErrorObj = JSON.parse(customError.message)
    dispatch('errorStore/recordLog', customErrorObj, { root: true })
    dispatch('snackBarStore/alertMessage', { text: customErrorObj.alertMessage }, { root: true })
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
