const book = require('./bookDataLoader');
const user = require('./userDataLoader');
const rental = require('./rentalDataLoader');
const reservation = require('./reservationDataLoader');

module.exports = {
  book,
  user,
  rental,
  reservation,
};
