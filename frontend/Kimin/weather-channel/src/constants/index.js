const ID_MAX_LENGTH = 10
const ID_MIN_LENGTH = 5
const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 12
const NAME_MIN_LENGTH = 2
const NAME_MAX_LENGTH = 7
const ACCESS_TOKEN_OLD = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNjUyODc0MTI0Mjg5IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.1GFoDUdvNPip4A3mBYODldTjXRL3xc0bL2LQ3AGs_3c'
const ACCESS_TOKEN_NEW = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU5NTY2MzE4NjgsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.TiW61LWpY4H-h-Wa2Io8M63GbxxxNzKknsFL1Cixf_w'
const REFRESH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNjU1NTUyNjU0Mzk5IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.41VTLXIhNXmAUuO9pEXAtNYOh9rmx1MC1_AIkgkBjE4'
const REFRESH_TOKEN_OLD = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDAwMDI2NTQzOTksIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.FAb3-TYGRCJpWSJYAVuduqOMjbMLr2isnlC7Kuwt2FM'

const AUTH_ERROR = ((originalRequest) => JSON.stringify({
  header: {
    HTTPStatusCode: '401',
    HTTPStatusDescription: 'unAuthorized',
    originalRequest: {
      header: originalRequest?.header,
      body: originalRequest?.body,
    },
  },
}))

const SERVER_ERROR = (originalRequest) => JSON.stringify({
  header: {
    HTTPStatusCode: '500',
    HTTPStatusDescription: 'Internal Server Error',
    originalRequest: {
      header: originalRequest?.header,
      body: originalRequest?.body,
    },
  },
})

const BAD_REQUEST_ERROR = (originalRequest) => JSON.stringify({
  header: {
    HTTPStatusCode: '404',
    HTTPStatusDescription: 'Bad Request',
  },
})

const SUCCESS_RESPONSE = (result) => JSON.stringify({
  header: {
    HTTPStatusCode: '200',
    HTTPStatusDescription: 'Request has Succeeded',
  },
  body: {
    result,
  },
})

export {
  SERVER_ERROR,
  SUCCESS_RESPONSE,
  AUTH_ERROR,
  BAD_REQUEST_ERROR,
  ID_MAX_LENGTH,
  ID_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  ACCESS_TOKEN_OLD,
  ACCESS_TOKEN_NEW,
  REFRESH_TOKEN,
  REFRESH_TOKEN_OLD,
}
