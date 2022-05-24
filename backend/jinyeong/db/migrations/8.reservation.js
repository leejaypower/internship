module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
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
        comment: '예약신청 유저ID',
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
        comment: '예약된 도서ID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      reservedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '예약 신청일',
      },
      state: {
        type: Sequelize.STRING(5),
        defaultValue: '대기',
        comment: '예약이력에 대한 상태정보입니다. [대기, 실행, 취소]로 구분됩니다.',
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
    await queryInterface.dropTable('Reservations');
  },
};
