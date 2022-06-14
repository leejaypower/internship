module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '유저 등록번호를 의미합니다',
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        comment: '유저 이름을 의미합니다.',
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: '유저 이메일 주소를 의미합니다.',
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '유저 비밀번호를 의미합니다.',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '유저 정보가 등록된 시간입니다.',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '유저 정보가 업데이트된 시간입니다.',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
