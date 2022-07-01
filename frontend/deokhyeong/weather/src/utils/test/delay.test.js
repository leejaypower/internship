import utils from '../index'

const { delay } = utils

jest.useFakeTimers()
describe('delay 메소드 테스트', () => {
  it('5초 후, 문자열 1을 리턴 => 1초 경과 상황', () => {
    const value = delay('1', 5)

    jest.advanceTimersByTime(1000)

    expect(Promise.resolve(value)).resolves.toBe('1')
  })

  it('5초 후, 문자열 1을 리턴 => 5초 경과 상황', async () => {
    const value = delay('1', 5)

    jest.advanceTimersByTime(5000)

    expect(await value).not.toBe('2')
    expect(await value).toBe('1')
  })

  it('5초 후, 문자열 1을 리턴 => 7초 경과 상황', async () => {
    const value = delay('1', 5)

    jest.advanceTimersByTime(7000)

    expect(await value).not.toBe('2')
    expect(await value).toBe('1')
  })

  afterEach(() => {
    jest.clearAllTimers()
  })
})
