module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rentals', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '대여의 id 데이터를 담고 있습니다.',
      },
      rentalDate: {
        type: Sequelize.DATE,
        comment: '해당 컬럼은 사용자가 도서를 대여한 일자를 나타냅니다.',
      },
      returnDate: {
        type: Sequelize.DATE,
        comment: '해당 칼럼은 사용자가 도서를 반납해야 할 예정 일자를 나타냅니다.',
      },
      state: {
        type: Sequelize.BOOLEAN,
        comment: '해당 컬럼은 해당 도서가 연체중인지를 표시합니다.',
      },
      overdue: {
        type: Sequelize.INTEGER,
        comment: '해당 컬럼은 해당 도서가 연체된 일수를 나타냅니다.',
      },
      isExtend: {
        type: Sequelize.INTEGER,
        comment: '해당 컬럼은 대출기간 연장 가능 횟수를 나타냅니다.',
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '해당 컬럼은 해당 도서를 대여한 사용자 아이디를 나타냅니다.',
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BookSerials',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '해당 컬럼은 대여한 도서의 시리얼넘버를 나타냅니다.',
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
    await queryInterface.dropTable('Rentals');
  },
};
