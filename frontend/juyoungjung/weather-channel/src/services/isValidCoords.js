const isValidCoords = ({ longitude, latitude }) => {
  if (longitude < -180 || longitude > 180) {
    return false
  }

  if (latitude < -90 || latitude > 90) {
    return false
  }

  return true
}

export default isValidCoords
