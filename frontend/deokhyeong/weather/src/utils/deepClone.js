const deepClone = (value) => {
  if (value === null) {
    return null
  }
  const checkType = ['number', 'string', 'undefined']
  if (checkType.includes(typeof value)) {
    return value
  }

  const clone = { ...value }
  Object.keys(clone).forEach(
    (key) => {
      clone[key] = typeof value[key] === 'object'
        ? deepClone(value[key])
        : value[key]
    },
  )

  if (Array.isArray(value)) {
    clone.length = value.length
    return Array.from(clone)
  }
  return clone
}

export default deepClone
