module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Returns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '대여 등록번호를 의미합니다.',
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '대여 정보가 등록된 시간입니다.',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '대여 정보가 업데이트된 시간입니다.',
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
        comment: '해당 반납건에 해당하는 대출 번호를 참조합니다.',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Returns');
  },
};
