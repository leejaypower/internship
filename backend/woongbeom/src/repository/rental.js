const db = require('../db/models');

const createRental = async (rentalInstance) => {
  try {
    const newRental = await db.Rental.create(rentalInstance);
    return newRental;
  } catch (err) {
    throw new Error('Error Occured attempting to create the rentalInstance');
  }
};

const updateStatus = async (rentalInstance) => {
  try {
    const bookInstance = await db.Book.findOne({
      where: {
        id: rentalInstance.bookId,
      },
      attributes: ['status'],
    });
    const bookStatus = bookInstance.dataValues.status;
    if (bookStatus === 0) {
      await db.Book.update({ status: 1 }, {
        where: {
          id: rentalInstance.bookId,
        },
      });
    } else {
      throw Error('book status update fail');
    }
    return bookInstance;
  } catch (err) {
    throw new Error('Rental error. it is already occupied or does not exist');
  }
};

module.exports = { createRental, updateStatus };
