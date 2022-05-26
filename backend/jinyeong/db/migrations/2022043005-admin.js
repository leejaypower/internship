module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Employees',
          },
          key: 'id',
          comment: '계정 소유직원ID',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
