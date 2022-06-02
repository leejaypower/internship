const deepClone = (value) => {
  const checkType = ['null', 'number', 'string', 'undefined']
  if (checkType.some((type) => checkType.includes(typeof type))) {
    return value
  }

  const clone = { ...value }
  Object.keys(clone).forEach(
    (key) => {
      (
        clone[key] = typeof value[key] === 'object'
          ? deepClone(value[key])
          : value[key]
      )
    },
  )
  if (Array.isArray(value)) {
    clone.length = value.length
    return Array.from(clone)
  }
  return clone
}

export default deepClone
