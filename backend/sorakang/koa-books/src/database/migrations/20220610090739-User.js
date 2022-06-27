module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '해당 컬럼은 사용자의 ID 나타냅니다.',
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: '해당 컬럼은 사용자의 아룸울 나타냅니다.',
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true,
        comment: '해당 컬럼은 사용자의 email을 나타냅니다.',
      },
      password: {
        type: Sequelize.STRING(300),
        allowNull: false,
        comment: '해당 컬럼은 사용자의 비밀번호를 나타냅니다.',
      },
      phone: {
        type: Sequelize.STRING(50),
        comment: '해당 컬럼은 사용자의 핸드폰 번호를 나타냅니다. EX) "01043218765"',
      },
      deleteDate: {
        type: Sequelize.DATE,
        comment: '해당 컬럼은 사용자가 회원탈퇴를 한 일자를 나타냅니다. ',
      },
      groupName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: 'Groups',
          key: 'groupName',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: '해당 컬럼은 사용자의 Role을 나타냅니다. (user , admin)',
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
    await queryInterface.dropTable('Users');
  },
};
