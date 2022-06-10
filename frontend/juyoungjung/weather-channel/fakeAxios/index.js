import { router } from '../fakeServer'
import interceptor from './interceptor'

const methodFunc = (method) => (url, data) => {
  const { request, response } = interceptor.result

  try {
    let result = null
    let checkedData = data
    let checkedUrl = url

    if (method === 'get' && data?.params) {
      checkedData = null

      const paramsEntries = Object.entries(data.params)
      const queryString = paramsEntries
        .reduce((acc, [key, value], idx) => {
          const temp = `${acc}${key}=${value}`
          return idx + 1 !== paramsEntries.length
            ? `${temp}&` : temp
        }, '')
      checkedUrl = `${url}?${queryString}`
    }

    const config = request.beforeRequestSentConfig

    if (config.headers.Authorization) {
      result = router[method](checkedUrl, {
        headers: config.headers,
        body: checkedData,
      })
    } else {
      result = router[method](checkedUrl, {
        header: null,
        body: checkedData,
      })
    }

    const requestAcceptedHttpStatusCodeList = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226]
    const isAccepted = requestAcceptedHttpStatusCodeList.some((code) => code === result.status)

    if (isAccepted) {
      if (response.success)response.success(Promise.resolve(result))
      return Promise.resolve(result)
    }

    if (result.status === 401 && response.error) {
      return response.error({
        config: {
          url,
          data,
          method,
        },
        response: result,
      })
    }

    return Promise.reject(result)
  } catch (error) {
    return Promise.reject(error)
  }
}

const defaults = {
  baseURL: '',
}

const fakeAxios = {
  defaults,
  interceptor,
  get: methodFunc('get'),
  post: methodFunc('post'),
  patch: methodFunc('patch'),
}
export default fakeAxios
