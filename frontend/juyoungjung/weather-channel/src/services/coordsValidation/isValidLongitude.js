const isValidLongitude = (longitude) => {
  if (longitude < -180 || longitude > 180) {
    return false
  }

  return true
}

export default isValidLongitude
