import weatherActions from '@/store/weather/actions'

import weatherMapping from '@/service/mapping/weatherMapping'

const currentWeatherMockResponse = {
  status: 200,
  data: {
    coord: {
      lon: -122.08,
      lat: 37.39,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    base: 'stations',
    main: {
      temp: 282.55,
      feels_like: 281.86,
      temp_min: 280.37,
      temp_max: 284.26,
      pressure: 1023,
      humidity: 100,
    },
    visibility: 10000,
    wind: {
      speed: 1.5,
      deg: 350,
    },
    clouds: {
      all: 1,
    },
    dt: 1560350645,
    sys: {
      type: 1,
      id: 5122,
      message: 0.0139,
      country: 'US',
      sunrise: 1560343627,
      sunset: 1560396563,
    },
    timezone: -25200,
    id: 420006353,
    name: 'Mountain View',
    cod: 200,
  },
}

jest.mock('@/service/api/weather', () => {
  const weatherApi = jest.requireActual('@/service/api/weather')

  return {
    __esModule: true,
    default: {
      ...weatherApi.default,
      getCurrentWeather: jest.fn(async ({
        lat, lon,
      }) => {
        if (!lat || !lon) {
          throw new Error()
        }
        return currentWeatherMockResponse
      }),
    },
  }
})

const commit = jest.fn()
const dispatch = jest.fn()
describe('currentWeatherSetting 테스트', () => {
  it('성공 케이스', async () => {
    const params = {
      lat: 35,
      lon: 139,
    }
    const response = await weatherActions.currentWeatherSetting(
      { commit, dispatch },
      params,
    )

    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('setCurrentWeather', weatherMapping.currentWeatherMapping(response.data))
    expect(dispatch).toHaveBeenCalledTimes(0)
    expect(response).toEqual(currentWeatherMockResponse)
  })
  it('실패 케이스', async () => {
    const params = { }
    const error = await weatherActions.currentWeatherSetting(
      { commit, dispatch },
      params,
    )

    expect(commit).toHaveBeenCalledTimes(0)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(
      'error/handleError',
      {
        errorLog: {
          type: 'api',
          status: error.status,
          originMessage: error.data?.message,
          message: '알 수 없는 오류, 관리자에게 문의 부탁드립니다.',
          responseURL: error.request?.responseURL,
        },
      },
      { root: true },
    )
  })
})
