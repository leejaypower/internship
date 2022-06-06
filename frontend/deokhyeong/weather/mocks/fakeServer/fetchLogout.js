const fetchLogout = () => {
  const successResponse = Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
    },
  })

  return successResponse
}

export default fetchLogout
