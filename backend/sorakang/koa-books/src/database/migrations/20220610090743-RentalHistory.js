module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RentalHistorys', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '대여id 데이터를 담고 있습니다.',
      },
      rentalDate: {
        type: Sequelize.DATE,
        comment: '해당 컬럼은 해당 도서를 대여한 일자를 나타냅니다.',
      },
      returnDate: {
        type: Sequelize.DATE,
        comment: '해당 컬럼은 해당 도서를 반납한 일자를 나타냅니다.',
      },
      overdue: {
        type: Sequelize.INTEGER,
        comment: '해당 컬럼은 해당 도서를 연체한 연체 일수를 나타냅니다.',
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '해당 컬럼은 해당 도서를 대여한 사용자 아이디를 나타냅니다.',
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RentalHistorys');
  },
};
