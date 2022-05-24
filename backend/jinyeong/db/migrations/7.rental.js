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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      rentalDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: '유저가 도서를 대출한 날',
      },
      returnDate: {
        type: Sequelize.DATE,
        comment: '유저가 도서를 반납한 날',
      },
      isExtended: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: '대출도서 연장여부',
      },
      dueDate: {
        type: Sequelize.DATE,
        comment: '유저가 대출한 도서를 반납 해야하는 날',
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
