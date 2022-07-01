import fakeAxios from '@/utils/fakeAxios'

const END_POINT = 'user'

export const changeUserNameFetch = (data) => {
  const result = fakeAxios.patch(`${END_POINT}/name`, data)
  return result
}

export const changeUserPasswordFetch = (data) => {
  const result = fakeAxios.patch(`${END_POINT}/password`, data)
  return result
}

export const deleteUserFetch = (idx) => {
  const result = fakeAxios.delete(`${END_POINT}/delete/${idx}`)
  return result
}
