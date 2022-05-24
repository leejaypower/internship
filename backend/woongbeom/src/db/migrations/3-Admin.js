module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '관리자 등록번호를 의미합니다',
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        comment: '관리자 이름을 의미합니다.',
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: '관리자 이메일 주소를 의미합니다.',
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '관리자 비밀번호를 의미합니다.',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '관리자 정보가 등록된 시간입니다.',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '관리자 정보가 업데이트된 시간입니다.',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Admins');
  },
};
