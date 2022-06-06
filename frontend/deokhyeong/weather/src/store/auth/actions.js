/* eslint-disable no-unused-vars */
import authApi from '@/service/api/auth'
import locationApi from '@/service/api/location'
import userMapping from '@/service/mapping/userMapping'
import authErrorMessageParser from '@/service/domain/auth/authErrorMessageParser'

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
    dispatch('alert/alertOpen', {
      status: error.status,
      message: authErrorMessageParser(error.data.message, '로그인 실패'),
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
    dispatch('alert/alertOpen', {
      status: error.status,
      message: authErrorMessageParser(error.data.message),
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
    dispatch('alert/alertOpen', {
      status: error.status,
      message: authErrorMessageParser(error.data.message, '회원가입 실패'),
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
    dispatch('alert/alertOpen', {
      status: error.status,
      message: authErrorMessageParser(error.data.message, '로그인 접속 기간 만료, 재로그인 필요'),
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
    dispatch('alert/alertOpen', {
      status: error.status,
      message: authErrorMessageParser(error.data.message, '정보 수정 실패'),
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
    dispatch('alert/alertOpen', {
      status: error.status,
      message: error.data.message,
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
    dispatch('alert/alertOpen', {
      status: error.status,
      message: error.data.message,
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
    dispatch('alert/alertOpen', {
      status: error.status,
      message: error.data.message,
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
    dispatch('alert/alertOpen', {
      status: error.status,
      message: error.data.message,
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
  initLocation,
}
