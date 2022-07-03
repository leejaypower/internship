const errorCode = {
  // REQUEST
  requiredInputNotNull: 'requiredInputNotNull',
  invalidInputType: 'invalidInputType',

  // AUTH
  requiredToken: 'requiredToken',
  invalidToken: 'invalidToken',
  invalidRole: 'invalidRole',
  loginFailed: 'loginFailed',

  // DATA
  alreadyExist: 'alreadyExist',
  noDataExist: 'noDataExist',

  // BUSINESS
  alreadyReturned: 'alreadyReturned',
  alreadyOnRental: 'alreadyOnRental',
  alreadyOnReservation: 'alreadyOnReservation',

  // UNEXPECTED
  internalServerError: 'internalServerError',
};

module.exports = { errorCode };
