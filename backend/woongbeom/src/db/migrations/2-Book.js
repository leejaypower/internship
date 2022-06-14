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
      author: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '책의 저자를 의미합니다.',
      },
      publisher: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '책의 발행자(출판사)를 의미합니다.',
      },
      page: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '책의 페이지 크기를 나타냅니다.',
      },
      statusCode: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Statuses',
          },
          key: 'id',
        },
        comment: '책의 상태 코드를 나타냅니다.',
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
