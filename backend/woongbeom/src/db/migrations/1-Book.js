module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '책이 테이블에 등록된 번호를 의미합니다.',
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        comment: '책의 제목을 의미합니다.',
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        comment: '책의 대출 가능 상태를 의미합니다. 0은 대출 가능, 1은 대출 불가 입니다.',
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '책이 테이블에 저장된 시간입니다.',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '책의 상태가 업데이트 된 시간입니다. (현재 사용되고 있지 않으나, 추가 기능 구현시 필요하고, 기본 생성 column이라 유지하였습니다.',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Books');
  },
};
