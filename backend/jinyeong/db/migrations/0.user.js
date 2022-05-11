module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: false,
        comment: '유저 이름',
      },
      contact: {
        type: Sequelize.STRING(13),
        allowNull: false,
        comment: '유저 연락처',
      },
      email: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: '유저 이메일',
      },
      password: {
        type: Sequelize.STRING(16),
        allowNull: false,
        comment: '유저 비밀번호',
      },
      isBlacklist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: '블랙리스트 여부',
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
    await queryInterface.dropTable('Users');
  },
};
