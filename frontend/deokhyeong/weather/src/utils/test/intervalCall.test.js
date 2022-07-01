import utils from '../index'

const { intervalCall } = utils

jest.useFakeTimers()
describe('intervall Call 검증', () => {
  let callback
  beforeEach(() => {
    callback = jest.fn()
  })

  it('3초 타이머 실행 검증 - 3초 전', () => {
    intervalCall(callback, 3)

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('3초 타이머 실행 검증 - 3초', () => {
    intervalCall(callback, 3)

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(3000)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('3초 타이머 실행 검증 - 5초 후', () => {
    intervalCall(callback, 3)

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(5000)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('3초 타이머 실행 검증 - 7초 후', () => {
    intervalCall(callback, 3)

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(7000)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('6분 타이머 실행 검증 - 3분', () => {
    intervalCall(callback, 6, 'min')

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(180000)
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('6분 타이머 실행 검증 - 6분', () => {
    intervalCall(callback, 6, 'min')

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(360000)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('6분 타이머 실행 검증 - 7분', () => {
    intervalCall(callback, 6, 'min')

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(420000)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('6분 타이머 실행 검증 - 15분', () => {
    intervalCall(callback, 6, 'min')

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(900000)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('12시간 타이머 실행 검증 - 1시간', () => {
    intervalCall(callback, 12, 'hours')

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(3600000)
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('12시간 타이머 실행 검증 - 12시간', () => {
    intervalCall(callback, 12, 'hours')

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(43200000)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('12시간 타이머 실행 검증 - 15시간', () => {
    intervalCall(callback, 12, 'hours')

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(54000000)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('12시간 타이머 실행 검증 - 25시간', () => {
    intervalCall(callback, 12, 'hours')

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(90000000)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  afterEach(() => {
    jest.clearAllTimers()
  })
})
