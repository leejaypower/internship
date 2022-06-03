const isShallowEqual = (value, comparisonValue) => {
  if (typeof value !== typeof comparisonValue) {
    return false
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
