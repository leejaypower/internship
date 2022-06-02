/**
 * 판단 여부 기준 시간은 현재 시각입니다.
 * @param {number} expireTime
 * 만료되었는지 검사하고 싶은 시간
 * @returns
 */
const isExpiredTime = (expireTime) => (expireTime - new Date().getTime()) < 0

export default isExpiredTime
