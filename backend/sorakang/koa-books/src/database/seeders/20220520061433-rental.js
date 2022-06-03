module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rentals', [
      {
        rentalDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        state: true,
        overdue: null,
        isExtend: 1,
        updatedAt: new Date(),
        userId: 1,
        bookId: 1,
      },
      {
        rentalDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        state: true,
        overdue: null,
        isExtend: 1,
        updatedAt: new Date(),
        userId: 1,
        bookId: 2,
      }, {
        rentalDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        state: true,
        overdue: null,
        isExtend: 1,
        updatedAt: new Date(),
        userId: 1,
        bookId: 3,
      }, {
        rentalDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        state: true,
        overdue: null,
        isExtend: 1,
        updatedAt: new Date(),
        userId: 4,
        bookId: 5,
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rentals', null, {});
  },
};
// npx sequelize-cli db:seed --seed 20220520061433-rental.js
