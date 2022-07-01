const { geolocationErrorMap } = require('../../src/services/mapping')

describe('geolocationErrorMap', () => {
  it('리턴 타입 확인', () => {
    expect(typeof geolocationErrorMap('User denied Geolocation')).toBe('object')
    expect(typeof geolocationErrorMap('unable to retrieve location')).toBe('object')
    expect(typeof geolocationErrorMap('Timeout expired')).toBe('object')
    expect(typeof geolocationErrorMap('test')).toBe('object')
  })
  it('위치 엑세스 거부', () => {
    expect(geolocationErrorMap('User denied Geolocation').title).toBe('위치 가져오기 실패')
    expect(geolocationErrorMap('User denied Geolocation').desc).toBe('위치 권한을 활성화 해주세요.')
  })
  it('시간 초과', () => {
    expect(geolocationErrorMap('Timeout expired').title).toBe('위치 가져오기 실패')
    expect(geolocationErrorMap('Timeout expired').desc).toBe('시간이 초과되어 위치를 가져올 수 없습니다.')
  })
  it('예상 외의 에러', () => {
    expect(geolocationErrorMap('test').title).toBe('위치 가져오기 실패')
    expect(geolocationErrorMap('test').desc).toBe('위치를 가져올 수 없습니다.')
  })
})
