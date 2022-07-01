/**
 *
 * @param {any} value
 * @param {any} comparisonValue
 * 1. 원시값의 경우 값을 단순 비교
 * 2. 참조값의 경우 depth1의 프로퍼티값을 비교 (depth1의 값이 객체인 경우 레퍼런스 비교)
 * @returns Boolean
 */
const isShallowEqual = (value, comparisonValue) => {
  if (typeof value !== typeof comparisonValue) {
    return false
  }

  if (value === null || comparisonValue === null) {
    return value === comparisonValue
  }

  if (Number.isNaN(value) && Number.isNaN(comparisonValue)) {
    return true
  }

  if (typeof value === 'object') {
    const isSameValues = Object.keys(comparisonValue)
      .every(
        (key) => value[key] === comparisonValue[key],
      )
    if (Array.isArray(value)) {
      const isSameLength = value.length === comparisonValue.length
      return isSameLength && isSameValues
    }
    return isSameValues
  }

  return value === comparisonValue
}

export default isShallowEqual
