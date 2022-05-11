module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rentals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
        comment: '대출유저 ID',
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Books',
          },
          key: 'id',
        },
        comment: '대출도서 ID',
      },
      rentalDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      returnDate: {
        type: Sequelize.DATE,
        comment: '대출도서 반납일',
      },
      isExtended: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: '대출도서 연장여부',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Rentals');
  },
};
