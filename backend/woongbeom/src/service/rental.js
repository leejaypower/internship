const repository = require('../repository');

const rentalService = async (rentalData) => {
  try {
    const { bookId, userId } = rentalData;
    await repository.rental.updateStatus({ bookId });
    const newRentalData = await repository.rental.createRental({ bookId, userId });
    return newRentalData;
  } catch (err) {
    return err.message;
  }
};

module.exports = { rentalService };
