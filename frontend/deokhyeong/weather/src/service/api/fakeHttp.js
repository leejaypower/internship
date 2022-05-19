import FakeAxios from '../../../mocks/fakeAxios'

const baseURL = 'https://localStorage.com'

const fakeHttp = new FakeAxios({
  baseURL,
})

export default fakeHttp
