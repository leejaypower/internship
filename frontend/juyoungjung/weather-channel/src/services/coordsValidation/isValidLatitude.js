const isValidLatitude = (latitude) => {
  if (latitude < -90 || latitude > 90) {
    return false
  }

  return true
}

export default isValidLatitude
