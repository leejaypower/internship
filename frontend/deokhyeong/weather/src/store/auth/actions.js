/* eslint-disable no-unused-vars */
import authApi from '@/service/api/auth'
import locationApi from '@/service/api/location'
import locationDomain from '@/service/domain/location'
import userMapping from '@/service/mapping/userMapping'
import locationMapping from '@/service/mapping/locationMapping'
import errorDomain from '@/service/domain/error'

const signIn = async ({ commit, dispatch }, { email, password }) => {
  try {
    const response = await authApi.signIn({ email, password })
    if (response.status === 200) {
      commit('setAuthData', userMapping(response.data))
      dispatch('alert/alertOpen', {
        status: response.status,
        message: '로그인 성공',
      }, { root: true })
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.authErrorMessageParser(error.data?.message, '로그인 실패'),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const getUserInfo = async ({ commit, dispatch }) => {
  try {
    const response = await authApi.getUserInfo()
    if (response.status === 200) {
      commit('setAuthData', userMapping(response.data))
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.authErrorMessageParser(error.data?.message),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const signUp = async ({ dispatch }, { email, password }) => {
  try {
    const response = await authApi.signUp({ email, password })
    dispatch('alert/alertOpen', {
      status: response.status,
      message: '회원가입 성공',
    }, { root: true })
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.authErrorMessageParser(error.data?.message, '회원가입 실패'),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const refreshSignIn = async ({ commit, dispatch }) => {
  try {
    const response = await authApi.refreshSignIn()
    if (response.status === 200) {
      commit('setAuthData', userMapping(response.data))
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.authErrorMessageParser(error.data?.message, '로그인 접속 기간 만료, 재로그인 필요'),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const repairUserInfo = async ({ commit, dispatch }, { repairUserData }) => {
  try {
    const response = await authApi.repairUserInfo(repairUserData)
    if (response.status === 200) {
      commit('setAuthData', userMapping(response.data))
      dispatch('alert/alertOpen', {
        status: response.status,
        message: '회원정보 수정 성공',
      }, { root: true })
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.authErrorMessageParser(error.data?.message, '정보 수정 실패'),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const addNewLocation = async ({ commit, dispatch }, { newLocation }) => {
  try {
    const response = await locationApi.addLocation(newLocation)
    if (response.status === 200) {
      commit('setLocationData', userMapping(response.data))
      dispatch('alert/alertOpen', {
        status: response.status,
        message: '지역 추가 성공',
      }, { root: true })
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.locationErrorMessageParser(error.data?.message),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const deleteLocation = async ({ commit, dispatch }, { location }) => {
  try {
    const response = await locationApi.deleteLocation(location)
    if (response.status === 200) {
      commit('setBookmarkLocationsData', userMapping(response.data))
      dispatch('alert/alertOpen', {
        status: response.status,
        message: '지역 삭제 성공',
      }, { root: true })
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.locationErrorMessageParser(error.data?.message),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const selectLocation = async ({ commit, dispatch }, { location }) => {
  try {
    const response = await locationApi.selectLocation(location)
    if (response.status === 200) {
      commit('setLocationData', userMapping(response.data))
      dispatch('alert/alertOpen', {
        status: response.status,
        message: '선택 지역이 변경되었습니다.',
        timeout: 2000,
      }, { root: true })
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.locationErrorMessageParser(error.data?.message),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const initLocation = async ({ commit, dispatch }) => {
  try {
    const response = await locationApi.initLocation()
    if (response.status === 200) {
      commit('setLocationData', userMapping(response.data))
      dispatch('alert/alertOpen', {
        status: response.status,
        message: '지역 목록 초기화 성공',
      }, { root: true })
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.locationErrorMessageParser(error.data?.message),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const currentLocationSetting = async ({ commit, dispatch }) => {
  try {
    const response = await locationDomain.getCurrentLocation()
    if (response) {
      const naverResponse = await dispatch('fetchCurrentLocationName', response)
      if (naverResponse.status !== 200) {
        commit('setCurrentLocation', locationMapping.locationMappingForBrowserAPI(response))
      }
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.locationErrorMessageParser(error.data?.message),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

const fetchCurrentLocationName = async ({ commit, dispatch }, { longitude, latitude }) => {
  try {
    const response = await locationApi.getLocationInfo({ coords: `${longitude},${latitude}` })
    if (response.status === 200) {
      commit(
        'setCurrentLocation',
        locationMapping.locationMapping({ ...response, longitude, latitude }),
      )
    }
    return response
  } catch (error) {
    dispatch('error/handleError', {
      errorLog: {
        type: 'api',
        status: error.status,
        originMessage: error.data?.message,
        message: errorDomain.naverErrorMessageParser(error.data?.message),
        responseURL: error.request?.responseURL,
      },
    }, { root: true })
    return error
  }
}

export default {
  signIn,
  signUp,
  refreshSignIn,
  repairUserInfo,
  getUserInfo,
  addNewLocation,
  deleteLocation,
  selectLocation,
  currentLocationSetting,
  initLocation,
  fetchCurrentLocationName,
}
