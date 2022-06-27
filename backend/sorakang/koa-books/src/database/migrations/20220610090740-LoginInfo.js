module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LoginInfos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '로그인정보의 id 데이터를 담고 있습니다.',
      },
      iat: {
        type: Sequelize.STRING(100),
        comment: '해당 컬럼은 로그인 시 발급되는 refresh token의 iat입니다. ',
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
        comment: '해당 컬럼은 로그인 중인 사용자의 Id를 나타냅니다. ',
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
    await queryInterface.dropTable('LoginInfos');
  },
};
