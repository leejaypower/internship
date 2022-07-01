const sum = (one, two) => Number(one + two)

describe('테스트용 덧셈', () => {
  it('happy', () => {
    expect(sum(1, 2)).toBe(3)
  })
  it('unHappy', () => {
    expect(sum(2, 2)).not.toBe(5)
  })
  it('edge', () => {
    expect(sum('2', 2)).not.toBe(4)
  })
})
