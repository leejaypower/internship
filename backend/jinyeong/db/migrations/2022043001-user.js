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
        type: Sequelize.STRING(32), // secret hex code(32bytes)
        allowNull: false,
        comment: '유저 연락처',
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true, // 이메일로 유저를 식별하기 위해 중복되지 않도록 설정.
        comment: '유저 이메일',
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        comment: '유저 비밀번호',
      },
      isBlacklist: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
