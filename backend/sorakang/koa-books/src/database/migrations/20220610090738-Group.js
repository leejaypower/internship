module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Groups', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '그룹의 id 데이터를 담고 있습니다.',
      },
      groupName: {
        type: Sequelize.STRING(100),
        unique: true,
        comment: '해당 컬럼은 사용자가 가질 수 있는 group 대한 명칭을 나타냅니다. ex) Administrator ,User ',
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
    await queryInterface.dropTable('Groups');
  },
};
