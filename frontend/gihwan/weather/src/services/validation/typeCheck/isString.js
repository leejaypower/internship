import { typeErrorMap } from '@/services/mapping/errorMap'

/**
 * 문자열인지 확인해 주는 프로미스
 * @param {*} number 확인할 데이터
 * @param {*} valueName 데이터의 이름
 * @returns 성공하면 true, 아니면 에러 문구를 반환
 */
const isStringCheck = (string, valueName) => {
  if (typeof string !== 'string') {
    const error = { errorMessage: typeErrorMap('string', valueName) }
    throw error
  }
}

export default isStringCheck
