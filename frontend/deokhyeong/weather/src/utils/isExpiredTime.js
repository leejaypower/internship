/**
 * 판단 여부 기준 시간은 현재 시각입니다.
 * @param {number | string} expireTime
 * 만료되었는지 검사하고 싶은 시간, string으로 인자를 넘길 시 숫자형 string만 가능
 * @returns
 */
const isExpiredTime = (expireTime) => {
  if (expireTime === null
    || expireTime === undefined
    || Number.isNaN(Number(expireTime))) {
    return false
  }
  return (expireTime - new Date().getTime()) < 0
}

export default isExpiredTime
