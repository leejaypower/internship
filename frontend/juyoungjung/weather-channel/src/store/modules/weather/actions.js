import { openWeatherApi, naverOpenApi } from '@/api'
import {
  SET_CURRENT_LOCATION,
  SET_RESPONSE_API_INFO,
  RESET_RESPONSE_API_INFO,
  SET_ONE_CALL_API_DATA,
  SET_CURRENT_COORDS,
  SET_SEARCH_COORDS,
  SET_FORECAST_HOURLY_DAY_TYPE,
  DAYJS_DATE_AND_DAY_FORMAT,
  SET_FORECAST_HOURLY_INFO,
  SET_FORECAST_DAILY_INFO,
  ONE_HOUR,
  TIME_FORMAT,
} from '@/constants'
import {
  makeApiResponseInfo,
  makeWeatherDataToFixedOne,
} from '@/services'
import {
  isValidCoords,
  makeCoordsValidationResponseInfo,
} from '@/services/coordsValidation'
import dayjs from 'dayjs'

const actions = {
  setCurrentCoords({ commit }, payload) {
    if (!isValidCoords(payload)) {
      const info = makeCoordsValidationResponseInfo(payload.longitude)

      return commit(SET_RESPONSE_API_INFO, info)
    }

    return commit(SET_CURRENT_COORDS, payload)
  },
  async getOneCallApi({ commit }, payload) {
    /* eslint-disable camelcase */
    if (!isValidCoords(payload)) {
      const info = makeCoordsValidationResponseInfo(payload.longitude)

      return commit(SET_RESPONSE_API_INFO, info)
    }

    try {
      const response = await openWeatherApi.fetchOneCallApi(payload)

      let dayFormatTypeList = []
      const initial = {
        hourlyInfo: {
          temperature: [],
          wind: [],
          rain: [],
        },
        dailyInfo: {
          temperature: [],
          wind: [],
          rain: [],
        },
      }

      if (response?.data?.hourly) {
        const { hourly, daily } = response.data

        const dayTypeSet = hourly.reduce((acc, data) => {
          const dayFormat = dayjs.unix(data.dt).format(DAYJS_DATE_AND_DAY_FORMAT)

          return acc.add(dayFormat)
        }, new Set())

        dayFormatTypeList = Array.from(dayTypeSet)

        const hourlyInfoGroupByDayFormatInitial = dayFormatTypeList.reduce((acc, dayFormatType) => {
          acc[dayFormatType] = {
            temperature: [],
            rain: [],
            wind: [],
          }

          return acc
        }, {})

        const hourlyInfoGroupByDayFormat = hourly
          .reduce((acc, data, index) => {
            const dayFormat = dayjs.unix(data.dt).format(DAYJS_DATE_AND_DAY_FORMAT)

            const oneHourTemperature = makeWeatherDataToFixedOne(data.temp)
            const oneHourRain = data.rain ? makeWeatherDataToFixedOne(data.rain[ONE_HOUR]) : 0.0
            const {
              dt,
              wind_speed,
              wind_deg,
              wind_gust,
            } = data

            const oneHourWindInfo = {
              key: index,
              hour: dayjs.unix(dt).format(TIME_FORMAT),
              wind_speed,
              wind_deg,
              wind_gust,
            }

            acc[dayFormat].temperature.push(oneHourTemperature)
            acc[dayFormat].rain.push(oneHourRain)
            acc[dayFormat].wind.push(oneHourWindInfo)

            return acc
          }, hourlyInfoGroupByDayFormatInitial)

        const hourlyInfo = dayFormatTypeList.reduce((acc, data, idx) => {
          acc.temperature[idx] = hourlyInfoGroupByDayFormat[data].temperature
          acc.rain[idx] = hourlyInfoGroupByDayFormat[data].rain
          acc.wind[idx] = hourlyInfoGroupByDayFormat[data].wind

          return acc
        }, initial.hourlyInfo)

        const dailyInfo = daily.reduce((acc, data, idx) => {
          const oneDayTemperature = makeWeatherDataToFixedOne(data.temp.day)

          const oneDayRainAmount = data.rain
            ? makeWeatherDataToFixedOne(data.rain) : 0.0

          const {
            dt,
            wind_speed,
            wind_deg,
            wind_gust,
          } = data

          const oneDayWindInfo = {
            key: idx,
            hour: dayjs.unix(dt).format(TIME_FORMAT),
            wind_speed,
            wind_deg,
            wind_gust,
          }

          acc.temperature.push(oneDayTemperature)
          acc.rain.push(oneDayRainAmount)
          acc.wind.push(oneDayWindInfo)

          return acc
        }, initial.dailyInfo)

        return (
          commit(SET_ONE_CALL_API_DATA, response.data),
          commit(SET_FORECAST_HOURLY_DAY_TYPE, dayFormatTypeList),
          commit(SET_FORECAST_HOURLY_INFO, hourlyInfo),
          commit(SET_FORECAST_DAILY_INFO, dailyInfo)
        )
      }

      return null
    } catch (error) {
      const info = makeApiResponseInfo(
        'error',
        '일일 예보 데이터를 가져오는 도중 문제가 발생했습니다. 최신 날씨 현황 가져오기를 위한 새로고침 버튼 클릭 시에도 동일한 문제가 발생할 경우 관리자에게 문의해주세요.',
        error.code,
      )

      return commit(SET_RESPONSE_API_INFO, info)
    }
  },
  async getLocationName({ commit }, payload) {
    if (!isValidCoords(payload)) {
      const info = makeCoordsValidationResponseInfo(payload.longitude)

      return commit(SET_RESPONSE_API_INFO, info)
    }

    try {
      const response = await naverOpenApi.getLocationNameByCoords(payload)

      if (!response.data.results[0]) {
        const info = makeApiResponseInfo(
          'info',
          '다음 우편번호 서비스에 현재 위치에 대한 행정동 이름을 요청한 결과 해당하는 데이터가 없습니다.',
        )

        return commit(SET_RESPONSE_API_INFO, info)
      }

      const { region } = response.data.results[0]
      const locationName = `${region.area1.name} ${region.area2.name} ${region.area3.name}`

      return commit(SET_CURRENT_LOCATION, locationName)
    } catch (error) {
      const info = makeApiResponseInfo(
        'error',
        '현재 위치의 행정동 이름을 가져오는 도중 문제가 발생했습니다. 관리자에게 문의해주세요.',
        error.code,
      )

      return commit(SET_RESPONSE_API_INFO, info)
    }
  },
  async getLocationCoords({ commit, dispatch }, payload) {
    try {
      const response = await naverOpenApi.getLocationCoordsByAddress(payload)

      if (response.data.addresses.length === 0) {
        const info = makeApiResponseInfo(
          'info',
          '날씨 정보를 가져올 수 없는 주소입니다. 해당 지역의 좌표가 다음 우편번호 서비스에 등록되지 않아 날씨 정보를 조회할 수 없습니다.',
        )

        commit(SET_RESPONSE_API_INFO, info)
      } else {
        const longitude = response.data.addresses[0].x
        const latitude = response.data.addresses[0].y

        commit(SET_SEARCH_COORDS, { longitude, latitude })
        await dispatch('getLocationName', { longitude, latitude })
        await dispatch('getOneCallApi', { longitude, latitude })
      }

      return null
    } catch (error) {
      const info = makeApiResponseInfo(
        'error',
        '검색한 주소의 좌표를 가져오는 도중 문제가 발생했습니다. 해당 페이지의 주소검색 버튼을 이용해 다시 시도해주세요.',
        error.code,
      )

      return commit(SET_RESPONSE_API_INFO, info)
    }
  },
  setApiResponseInfo({ commit }, payload) {
    commit(SET_RESPONSE_API_INFO, payload)
  },
  resetApiResponseInfo({ commit }) {
    commit(RESET_RESPONSE_API_INFO)
  },
}

export default actions
