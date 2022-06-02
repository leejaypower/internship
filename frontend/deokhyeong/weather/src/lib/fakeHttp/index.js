import FakeAxios from '../../../mocks/fakeAxios'

const baseURL = 'https://localStorage.com'

const fakeHttp = new FakeAxios({
  baseURL,
})

fakeHttp.config.headers.Authentication = localStorage.getItem('accessToken')

export default fakeHttp
