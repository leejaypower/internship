const { naverErrorMap } = require('../../src/services/mapping')

describe('naverErrorMap', () => {
  it('리턴 타입 확인', () => {
    expect(typeof naverErrorMap('Authentication Failed')).toBe('object')
    expect(typeof naverErrorMap('io error')).toBe('object')
    expect(typeof naverErrorMap('test')).toBe('object')
  })
  it('인증 실패', () => {
    expect(naverErrorMap('Authentication Failed').title).toBe('주소 변환 실패')
    expect(naverErrorMap('Authentication Failed').desc).toBe('주소 변환에 실패하였습니다.')
  })
  it('알 수 없는 에러', () => {
    expect(naverErrorMap('io error').title).toBe('주소 변환 실패')
    expect(naverErrorMap('io error').desc).toBe('통신 중 에러가 발생했습니다.')
  })
  it('예상 외의 에러', () => {
    expect(naverErrorMap('test').title).toBe('통신 실패')
    expect(naverErrorMap('test').desc).toBe('통신 중 에러가 발생했습니다.')
  })
})
