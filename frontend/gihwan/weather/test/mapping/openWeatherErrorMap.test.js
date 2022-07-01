const { openWeatherErrorMap } = require('../../src/services/mapping')

describe('openWeatherErrorMap', () => {
  it('리턴 타입 확인', () => {
    expect(typeof openWeatherErrorMap('Request failed with status code 401')).toBe('object')
    expect(typeof openWeatherErrorMap('test')).toBe('object')
  })
  it('위치 엑세스 거부', () => {
    expect(openWeatherErrorMap('Request failed with status code 401').title).toBe('날씨 정보 가져오기 실패')
    expect(openWeatherErrorMap('Request failed with status code 401').desc).toBe('API키를 확인해 주세요.')
  })
  it('예상 외의 에러', () => {
    expect(openWeatherErrorMap('test').title).toBe('통신 실패')
    expect(openWeatherErrorMap('test').desc).toBe('통신 중 에러가 발생했습니다.')
  })
})
