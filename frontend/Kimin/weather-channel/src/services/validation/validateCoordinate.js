export default function validateCoordinate(lat, lon) {
  const isValidLatitude = Number(lat) >= 0 && Number(lat) <= 90
  const isValidLongitude = Number(lon) >= -180 && Number(lon) <= 180
  if (!isValidLatitude || !isValidLongitude) {
    throw new Error()
  }
}
