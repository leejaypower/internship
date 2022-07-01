import utils from '../index'

const { isExpiredTime } = utils

/**
 * 의도된 동작을 위해서는 숫자형 string, number값만 전달해야합니다.
*/
describe('isExpiredTime에 대한 검증', () => {
  it('0 string을 인자로 줄 때', () => {
    expect(isExpiredTime(0)).toBe(true)
  })

  it('0을 인자로 줄 때', () => {
    expect(isExpiredTime(0)).toBe(true)
  })

  it('이미 지난 날짜 기준를 인자로 줄 때', () => {
    const pastTime = new Date('2020.01.01').getTime()
    expect(isExpiredTime(pastTime)).toBe(true)
  })

  it('현재 시간을 기준 날짜를 인자로 줄 때', () => {
    const currentTime = new Date().getTime()
    expect(isExpiredTime(currentTime)).toBe(false)
  })

  it('먼 미래를 기준 날짜를 인자로 줄 때', () => {
    const futureTime = new Date('2099.01.01').getTime()
    expect(isExpiredTime(futureTime)).toBe(false)
  })

  it('인자로 string을 넘길 때, 과거 날짜 string 인자', () => {
    const pastTime = new Date('2020.01.01').getTime()
    expect(isExpiredTime(pastTime.toString())).toBe(true)
  })

  it('인자로 string을 넘길 때, 현재 날짜 string 인자', () => {
    const currentTime = new Date().getTime().toString()
    expect(isExpiredTime(currentTime)).toBe(false)
  })

  it('인자로 string을 넘길 때, 미래 날짜 string 인자', () => {
    const futureTime = new Date('2099.01.01').getTime()
    expect(isExpiredTime(futureTime)).toBe(false)
  })
})

describe('isExpiredTime에 숫자가 아닌 값을 인자로 줄 때', () => {
  it('null을 인자로 줄 때', () => {
    expect(isExpiredTime(null)).toBe(false)
  })

  it('아무것도 인자로 안 줄 때', () => {
    expect(isExpiredTime()).toBe(false)
  })

  it('인자로 string을 넘길 때, 날짜 string 아님', () => {
    expect(isExpiredTime('나랏말싸미')).toBe(false)
  })
})
