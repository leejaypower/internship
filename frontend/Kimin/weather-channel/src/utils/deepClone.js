const testHasprimitiveArgument = (obj) => {
  if (typeof obj !== 'object') {
    return false
  }
  if (Array.isArray(obj)) {
    const hasPrimitive = obj.find((item) => typeof item === 'object')
    if (hasPrimitive) {
      return true
    }
    return false
  }
  const hasPrimitive = Object.values(obj).find((item) => typeof item === 'object')
  if (hasPrimitive) {
    return true
  }
  return false
}

const deepClone = (variable) => {
  if (typeof variable !== 'object') {
    return variable
  }
  const hasprimitiveArgument = testHasprimitiveArgument(variable)

  if (Array.isArray(variable)) {
    if (!hasprimitiveArgument) {
      return [...variable]
    }
    const clonedVariable = variable.map((item) => deepClone(item))
    return clonedVariable
  }

  if (!hasprimitiveArgument) {
    return { ...variable }
  }
  const variableAsArray = Object.entries(variable)
  const objForClone = {}
  variableAsArray.forEach(([key, value]) => {
    if (typeof value === 'object') {
      objForClone[`${key}`] = deepClone(value)
    } else {
      objForClone[`${key}`] = value
    }
  })
  return objForClone
}

export default deepClone
