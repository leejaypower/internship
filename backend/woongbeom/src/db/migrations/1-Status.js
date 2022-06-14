module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Statuses', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        comment: '도서의 상태 코드를 나타냅니다.',
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '상태 코드에 대한 설명을 나타냅니다.',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Statuses');
  },
};
