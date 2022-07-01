import { typeErrorMap } from '@/services/mapping/errorMap'

/**
 * 객체인지 확인해 주는 프로미스
 * @param {*} number 확인할 데이터
 * @param {*} valueName 데이터의 이름
 * @returns 성공하면 true, 아니면 에러 문구를 반환
 */
const isObjectCheck = (object, valueName) => {
  if (typeof object !== 'object') {
    const error = { errorMessage: typeErrorMap('object', valueName) }
    throw error
  }
}

export default isObjectCheck
