import axios from 'axios'

const SERVER_URL = '127.234.23.1' // 임의의 주소
const END_POINT = '/auth'

export const loginFetchByAxios = async (loginData) => {
  try {
    const loginResult = await axios.post(`${SERVER_URL + END_POINT}/login`, loginData)
    return loginResult
  } catch (error) {
    return error
  }
}

/**
 * DB에서 아이디 값에 맞는 데이터를 찾는 함수
 * @param {Array} DB user정보가 들어있는 DB
 * @param {String} id 찾고자하는 아이디 값
 * @returns 있으면 데이터 반환 {id:string, pw: string, name: string}, 없으면 false
 */
const findIdByDB = (DB, id) => {
  const result = DB.filter((userInfo) => userInfo.id === id)[0]
  if (result) return result
  return false
}

/**
 * DB에서 찾은 아이디 값의 비밀번호와 사용자가 입력한 비밀번호를 대조하는 함수
 * @param {String} pwOfFindIdByDB DB에서 찾은 아이디 값의 비밀번호
 * @param {String} pwOfUserInput 사용자가 입력한 비밀번호
 * @returns 맞으면 true, 틀리면 false
 */
const comparePw = (pwOfFindIdByDB, pwOfUserInput) => {
  const result = pwOfFindIdByDB === pwOfUserInput
  if (result) return true
  return false
}

export const loginFetchByStorage = (loginData) => {
  const { id, pw } = loginData
  const DB = JSON.parse(localStorage.getItem('user'))

  if (!DB) return { isSuccess: false, failMessage: '존재하지 않는 아이디입니다.' }

  const findIdByDBResult = findIdByDB(DB, id)
  if (!findIdByDBResult) {
    return { isSuccess: false, failMessage: '존재하지 않는 아이디입니다.' }
  }

  const comparePwResult = comparePw(findIdByDBResult.pw, pw)
  if (!comparePwResult) {
    return { isSuccess: false, failMessage: '비밀번호를 다시 확인해 주세요.' }
  }

  return { isSuccess: true, id, name: findIdByDBResult.name }
}

export const idDuplicateCheckByAxios = async (id) => {
  try {
    const signupResult = await axios.post(`${SERVER_URL + END_POINT}/idCheck`, id)
    return signupResult
  } catch (error) {
    return error
  }
}

export const signupFetchByAxios = async (signupData) => {
  try {
    const signupResult = await axios.post(`${SERVER_URL + END_POINT}/signup`, signupData)
    return signupResult
  } catch (error) {
    return error
  }
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
