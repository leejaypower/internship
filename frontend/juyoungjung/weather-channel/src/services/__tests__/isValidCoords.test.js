import isValidCoords from '../coordsValidation/isValidCoords'

describe('longitude and latitude validation test', () => {
  test('longitude(경도)는 -180도(°) 이상 180도(°) 이하여야 한다.', () => {
    const result = isValidCoords({ longitude: '-0', latitude: 0 })

    expect(result).toBe(true)
  })
  test('latitude(위도)는 -90도(°) 이상 90도(°) 이하여야 한다.', () => {
    const result = isValidCoords({ longitude: 0, latitude: '-0' })

    expect(result).toBe(true)
  })
})
