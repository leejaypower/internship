import isValidLatitude from './isValidLatitude'
import isValidLongitude from './isValidLongitude'

const isValidCoords = ({ longitude, latitude }) => {
  if (!isValidLongitude(longitude) || !isValidLatitude(latitude)) {
    return false
  }

  return true
}

export default isValidCoords
