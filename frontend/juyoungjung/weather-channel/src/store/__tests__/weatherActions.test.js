import actions from '@/store/modules/weather/actions'
import {
  makeApiResponseInfo,
} from '@/services'

let url = ''
let body = {}
let mockError = false

jest.mock('axios', () => {
  const mAxiosInstance = {
    get: (_url, _body) => new Promise((resolve) => {
      if (mockError) {
        throw new Error()
      }

      url = _url
      body = _body
      resolve({ data: 'success mock data' })
    }),
  }

  return ({
    create: jest.fn(() => mAxiosInstance),
  })
})

const commit = jest.fn()
const dispatch = jest.fn()

const rootGetters = {
  'user/myInfo': {
    email: 't@t.com',
    nickname: 'test',
  },
}

describe('weather actions test', () => {
  it('getOneCallApi action success', async () => {
    const coords = { longitude: 0, latitude: 0 }
    const API_KEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY

    await actions.getOneCallApi({ commit, dispatch, rootGetters }, coords)

    expect(url).toBe('/onecall')
    expect(body).toEqual({
      params: {
        lon: 0,
        lat: 0,
        units: 'metric',
        appid: API_KEY,
      },
    })
  })

  it('getOneCallApi action catched as error', async () => {
    mockError = true

    await actions.getOneCallApi({ commit, dispatch, rootGetters }, {})

    const info = makeApiResponseInfo(
      'error',
      '일일 예보 데이터를 가져오는 도중 문제가 발생했습니다. 최신 날씨 현황 가져오기를 위한 새로고침 버튼 클릭 시에도 동일한 문제가 발생할 경우 관리자에게 문의해주세요.',
    )

    expect(dispatch).toHaveBeenCalledWith('alert/setWeatherApiResponse', info, { root: true })
  })
})
