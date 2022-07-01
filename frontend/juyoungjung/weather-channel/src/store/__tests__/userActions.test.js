import actions from '@/store/modules/user/actions'
import {
  makeApiResponseInfo,
} from '@/services'
import { translateFakeAxiosResponseErrorCode } from '@/services/errorHandler'

let url = ''
let body = {}
let mockError = false
const payload = { email: 't@t.com', password: 'pw', nickname: 'test' }
const error = { data: { code: 'Duplicated nickname' } }

jest.mock('../../../fakeAxios/index.js', () => {
  const originalModule = jest.requireActual('../../../fakeAxios/index.js')

  return {
    ...originalModule,
    post: (_url, _body) => new Promise((resolve, reject) => {
      if (mockError) {
        reject(error)
      }

      url = _url
      body = _body
      resolve()
    }),
  }
})

const dispatch = jest.fn()

describe('user actions test', () => {
  it('signup action success', async () => {
    await actions.signup({ dispatch }, payload)

    expect(url).toBe('/signup')
    expect(body).toEqual(payload)

    const info = makeApiResponseInfo(
      'success',
      '회원가입이 정상적으로 완료되었습니다.',
    )

    expect(dispatch).toHaveBeenCalledWith('alert/setUserApiResponse', info, { root: true })
  })

  it('signup action catched as error', async () => {
    mockError = true

    await actions.signup({ dispatch }, payload)

    const info = makeApiResponseInfo(
      'error',
      translateFakeAxiosResponseErrorCode(error.data.code),
    )

    expect(dispatch).toHaveBeenCalledWith('alert/setUserApiResponse', info, { root: true })
  })
})
