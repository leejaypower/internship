import jwt from 'jwt-decode'
import { v4 as uuid } from 'uuid'

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

/**
 * 임의의 index값을 생성하는 함수
 * @returns 임의의 index값
 */
const createId = () => uuid()

export const login = (data) => new Promise((resolve, reject) => {
  const { id, pw } = data
  const DB = JSON.parse(localStorage.getItem('user'))
  if (!DB) reject(new Error('존재하지 않는 아이디입니다.'))

  const findIdByDBResult = findIdByDB(DB, id)
  if (!findIdByDBResult) {
    reject(new Error('존재하지 않는 아이디입니다.'))
  }

  const comparePwResult = comparePw(findIdByDBResult.pw, pw)
  if (!comparePwResult) {
    reject(new Error('비밀번호를 다시 확인해 주세요.'))
  }

  // 만료 기간이 1년인 임의의 토큰(22.05.13일 기준)
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmFyb2dvIiwiaWF0IjoxNjUyNDI3MzI3LCJleHAiOjE2ODM5ODQ5Mjd9.EvidSw6VHaCTDxNPj0EkpJQERAx_vo8yBRzufawJo3M'
  const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmFyb2dvIiwiaWF0IjoxNjUyNDI3MzI3LCJleHAiOjE2ODM5ODQ5Mjd9.EvidSw6VHaCTDxNPj0EkpJQERAx_vo8yBRzufawJo3M'

  resolve({
    userInfo: {
      idx: findIdByDBResult.idx,
      id,
      name: findIdByDBResult.name,
    },
    tokens: { accessToken, refreshToken },
  })
})

export const IsIdDuplicateCheck = (id) => new Promise((resolve, reject) => {
  if (!id) {
    reject(new Error('id값이 없습니다.'))
  }
  const DB = JSON.parse(localStorage.getItem('user'))
  if (!DB) {
    resolve(true)
  }
  if (!findIdByDB(DB, id)) {
    resolve(true)
  }
  resolve(false)
})

export const signup = (signupData) => new Promise((resolve) => {
  const DB = JSON.parse(localStorage.getItem('user'))
  const idx = createId()
  if (!DB) {
    localStorage.setItem('user', JSON.stringify([{ idx, ...signupData }]))
  } else {
    const newDB = [...DB, { idx, ...signupData }]
    localStorage.setItem('user', JSON.stringify(newDB))
  }
  resolve('로그인을 시도해 보세요.')
})

export const changeUserName = (data, options) => new Promise((resolve, reject) => {
  const { header } = options
  const { name: jwtName } = jwt(header)
  if (jwtName !== 'barogo') {
    reject(new Error('토큰을 다시 확인해 주세요'))
  }
  const { idx, newName } = data
  const DB = JSON.parse(localStorage.getItem('user'))
  const userInfoIndex = DB.findIndex((user) => user.idx === idx)
  DB[userInfoIndex].name = newName
  localStorage.setItem('user', JSON.stringify(DB))
  resolve(true)
})

export const changeUserPassword = (data, options) => new Promise((resolve, reject) => {
  const { header } = options
  const { name } = jwt(header)
  if (name !== 'barogo') {
    reject(new Error('토큰을 다시 확인해 주세요'))
  }
  const { idx, currentPw, newPw } = data
  const DB = JSON.parse(localStorage.getItem('user'))
  const userInfo = DB.filter((user) => user.idx === idx)[0]
  const userInfoIndex = DB.findIndex((user) => user.idx === idx)
  if (userInfo.pw !== currentPw) {
    reject(new Error('현재 비밀번호가 정확하지 않습니다.'))
  } else {
    DB[userInfoIndex].pw = newPw
    localStorage.setItem('user', JSON.stringify(DB))
    resolve('비밀번호가 변경되었습니다.<br/>다시 로그인 해주세요.')
  }
})

export const deleteUser = (idx, options) => new Promise((resolve, reject) => {
  const { header } = options
  const { name } = jwt(header)
  if (name !== 'barogo') {
    reject(new Error('토큰을 다시 확인해 주세요'))
  }
  const DB = JSON.parse(localStorage.getItem('user'))
  const newDB = DB.filter((user) => user.idx !== idx)
  if (newDB.length === 0) {
    reject(new Error('해당하는 회원이 없습니다.'))
  }
  localStorage.setItem('user', JSON.stringify(newDB))
  resolve('삭제가 완료되었습니다.')
})

export const notFound = () => new Promise((resolve, reject) => {
  reject(new Error('404 Not Found'))
})
