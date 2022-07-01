import utils from '../index'

const { deepClone } = utils

describe('deepClone 케이스 테스트', () => {
  /**
   * 원시 복사 및 depth에 따른 같은 값 복사를 확인했습니다
   * 깊은 복사에 따른 참조가 달라지는 과정역시 같이 검증하였습니다.
   * 추가적으로 검증이 필요해보이는 부분에 대한 내용은
   * 지속적으로 업데이트해나가겠습니다.
  */
  it('원시 타입 복사', () => {
    const numValue = 1
    const nullValue = null
    const strValue = '나랏말싸미'
    const undefinedValue = undefined

    expect(deepClone(numValue)).toBe(1)
    expect(deepClone(nullValue)).toBe(null)
    expect(deepClone(strValue)).toBe('나랏말싸미')
    expect(deepClone(undefinedValue)).toBe(undefined)
  })

  it('객체 깊은 복사 확인, depth1', () => {
    const object = {
      a: 1,
    }
    const copy = deepClone(object)

    expect(copy).toStrictEqual(object)
    expect(copy === object).toBe(false)
  })

  it('객체 깊은 복사 확인, depth2', () => {
    const object = {
      a: {
        b: 1,
      },
    }
    const copy = deepClone(object)

    expect(copy).toStrictEqual(object)
    expect(copy.a === object.a).toBe(false)
    expect(copy.a.b === object.a.b).toBe(true)

    copy.a.b = 2
    expect(copy.a.b !== object.a.b).toBe(true)
  })

  it('배열 원시값 복사', () => {
    const array = [1, '나랏말싸미', 3, null, undefined]
    const copy = deepClone(array)

    expect(copy).toEqual(copy)
  })

  it('배열 depth2 비교', () => {
    const array = [1, '나랏말싸미', 3, { a: 1 }]
    const copy = deepClone(array)

    expect(array).toEqual(copy)
    expect(array[3] === copy[3]).toBe(false)
  })
})
