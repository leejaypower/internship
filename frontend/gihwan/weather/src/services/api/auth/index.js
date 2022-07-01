import fakeAxios from '@/utils/fakeAxios'

const END_POINT = 'auth'

/**
 * 서버에게 로그인 요청을 하는 함수
 * @param {object} data {id: string, pw: string}
 * @returns 실패 시 에러 문구, 성공 시 유저 정보와 토큰 정보
 */
export const loginFetch = (data) => {
  const result = fakeAxios.post(`${END_POINT}/login`, data)
  return result
}

/**
 * 서버에게 아이디 중복 체크를 요청하는 함수
 * @param {string} id 체크할 아이디 값
 * @returns 중복된 아이디가 있으면 true, 없으면 false
 */
export const idDuplicateFetch = (id) => {
  const result = fakeAxios.post(`${END_POINT}/idDuplicate`, id)
  return result
}

/**
 * 서버에게 회원가입을 요청하는 함수
 * @param {object} data { id: string, pw: string, name: string }
 * @returns 성공 시 성공 문구
 */
export const signupFetch = (data) => {
  const result = fakeAxios.post(`${END_POINT}/signup`, data)
  return result
}

export const idDuplicateCheckByStorage = (id) => {
  const DB = JSON.parse(localStorage.getItem('user'))
  if (!DB) return true

  const idCheck = DB.some((user) => user.id === id)
  if (!idCheck) return true

  return false
}

export const signupFetchByStorage = (signupData) => {
  const DB = JSON.parse(localStorage.getItem('user'))
  if (!DB) {
    localStorage.setItem('user', JSON.stringify([signupData]))
    return
  }
  const newDB = [...DB, signupData]
  localStorage.setItem('user', JSON.stringify(newDB))
}
