import makeWeatherDataToFixedOne from '../makeWeatherDataToFixedOne'

describe('makeWeatherDataToFixedOne return value test', () => {
  test('makeWeatherDataToFixedOne 함수가 인자로 받은 매개변수는 Number형이어야 하며,\n Number.prototype.toFixed()에 의해 소수점 한자리까지 반올림하여 고정 소수점 표기법으로 표시되어\n Number형으로반환되어야 한다.', () => {
    const result = makeWeatherDataToFixedOne('0.891')

    expect(result).toBe(0.9)
  })
})
