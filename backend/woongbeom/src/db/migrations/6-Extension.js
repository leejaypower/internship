module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Extensions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '연장 등록번호를 의미합니다.',
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '연장 정보가 등록된 시간입니다.',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '연장 정보가 업데이트된 시간입니다.',
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
        comment: '해당 연장건에 해당하는 책 번호를 참조합니다.',
      },
      rentalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Rentals',
          },
          key: 'id',
        },
        comment: '해당 연장건에 해당하는 대여 번호를 참조합니다.',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Extensions');
  },
};
