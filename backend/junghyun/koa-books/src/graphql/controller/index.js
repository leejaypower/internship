const graphqlBookController = require('./book');
const graphqlUserController = require('./user');
const graphqlRentalController = require('./bookRental');
const graphqlReservationController = require('./reservation');

module.exports = {
  graphqlBookController,
  graphqlUserController,
  graphqlRentalController,
  graphqlReservationController,
};
