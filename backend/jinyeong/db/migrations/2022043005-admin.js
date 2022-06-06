module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: '관리자 계정 이메일',
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        comment: '관리자 계정 비밀번호',
      },
      accessToken: {
        type: Sequelize.STRING(300),
        allowNull: true,
        comment: '관리자 계정 액세스 토큰(중복 로그인 방지용)',
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
    await queryInterface.dropTable('Admins');
  },
};
