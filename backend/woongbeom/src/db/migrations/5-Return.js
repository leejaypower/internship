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
      isDelayed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // 현재 로직 구현 전이라, 기본값을 0으로 두었습니다. 구현하면서 삭제 예정입니다.
        comment: '책 반납의 연체일수를 나타냅니다. 연체되지 않은 경우, 0입니다.',
      },
      isExtended: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, // 현재 로직 구현 전이라, 기본값을 false로 두었습니다. 구현하면서 삭제 예정입니다.
        comment: '책 반납기간이 연장되었는지 여부를 나타냅니다.',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Returns');
  },
};
