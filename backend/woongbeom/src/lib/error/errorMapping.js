const httpStatusCodeMapping = {
  // REQUEST
  requiredInputNotNull: 400,
  invalidInputType: 400,

  // AUTH
  requireedToken: 401,
  invalidToken: 401,
  invalidRole: 401,
  loginFailed: 401,

  // DATA
  alreadyExist: 400,
  noDataExist: 404,

  // BUSINESS
  alreadyReturned: 500,
  alreadyOnRental: 500,
  alreadyOnReservation: 500,

  // UNEXPECTED
  internalServerError: 500,
};

const messageMapping = {
  // REQUEST
  requiredInputNotNull: 'Required Input Not Null',
  invalidInputType: 'Invalid Input Type',

  // AUTH
  requireedToken: 'Required Token',
  invalidToken: 'Invalid Token',
  invalidRole: 'Invalid Role',
  loginFailed: 'Login Failed',

  // DATA
  alreadyExist: 'Already Exist',
  noDataExist: 'No Data Exist',

  // BUSINESS
  alreadyReturned: 'Already Returned',
  alreadyOnRental: 'Already On Rental',
  alreadyOnReservation: 'Already On Reservation',

  // UNEXPECTED
  internalServerError: 'Internal Server Error',
};

module.exports = { httpStatusCodeMapping, messageMapping };
