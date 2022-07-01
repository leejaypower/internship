import utils from '../index'

const { isShallowEqual, deepClone } = utils

describe('isShallowEqual 메서드 테스트', () => {
  it('falsy한 값 비교', () => {
    expect(isShallowEqual(null, 0)).toBeFalsy()
    expect(isShallowEqual(null, undefined)).toBeFalsy()
    expect(isShallowEqual(undefined, 0)).toBeFalsy()
  })
  it('NaN 비교', () => {
    expect(isShallowEqual(NaN, NaN)).toBeTruthy()
  })
  it('null 비교', () => {
    expect(isShallowEqual(null, null)).toBeTruthy()
  })
  it('string 비교', () => {
    expect(isShallowEqual('나랏말싸미', '나랏말싸미')).toBeTruthy()
    expect(isShallowEqual('나랏말싸미', '나랏말미')).toBeFalsy()
  })
  it('number 비교', () => {
    expect(isShallowEqual(3, 3)).toBeTruthy()
    expect(isShallowEqual(3, 4)).toBeFalsy()
  })
  it('undefined 비교', () => {
    expect(isShallowEqual(undefined, undefined)).toBeTruthy()
  })
  it('객체 복사 비교, 참조 복사', () => {
    const a = { a: { a: 1 }, b: 1 }
    const b = a

    expect(isShallowEqual(a, b)).toBeTruthy()
  })
  it('객체 복사 비교, 얕은 복사', () => {
    const a = { a: { a: 1 }, b: 1 }
    const b = { ...a }

    expect(isShallowEqual(a, b)).toBeTruthy()
  })
  it('객체 복사 비교, 깊은 복사', () => {
    const a = { a: { a: 1 }, b: 1 }
    const b = deepClone(a)

    expect(isShallowEqual(a, b)).toBeFalsy()
  })
  it('객체 depth 1 비교, depth1 참조 동일', () => {
    const obj = { a: 1 }
    const a = { a: obj, b: 1 }
    const b = { a: obj, b: 1 }

    expect(isShallowEqual(a, b)).toBeTruthy()
  })
  it('객체 비교, depth1 참조 다름', () => {
    const a = { a: { a: 1 }, b: 1 }
    const b = { a: { a: 1 }, b: 1 }

    expect(isShallowEqual(a, b)).toBeFalsy()
  })
  it('배열 복사 비교, 참조 복사', () => {
    const obj = { a: 1 }
    const a = [1, 2, 3, 4, obj]
    const b = a

    expect(isShallowEqual(a, b)).toBeTruthy()
  })
  it('배열 복사 비교, 얕은 복사', () => {
    const obj = { a: 1 }
    const a = [1, 2, 3, 4, obj]
    const b = [...a]

    expect(isShallowEqual(a, b)).toBeTruthy()
  })
  it('배열 복사 비교, 깊은 복사', () => {
    const obj = { a: 1 }
    const a = [1, 2, 3, 4, obj]
    const b = deepClone(a)

    expect(isShallowEqual(a, b)).toBeFalsy()
  })
  it('배열 depth 1 비교, depth1 참조 동일', () => {
    const obj = { a: 1 }
    const a = [1, 2, 3, 4, obj]
    const b = [1, 2, 3, 4, obj]

    expect(isShallowEqual(a, b)).toBeTruthy()
  })
  it('배열 비교, depth1 참조 다름', () => {
    const a = [1, 2, 3, 4, { a: 1 }]
    const b = [1, 2, 3, 4, { a: 1 }]

    expect(isShallowEqual(a, b)).toBeFalsy()
  })
})
