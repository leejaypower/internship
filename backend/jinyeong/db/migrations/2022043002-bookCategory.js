module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      koreanDecimalClassificationCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '도서 한국십진분류표(KDC) 분류코드',
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: false,
        comment: 'KDC 코드에 해당하는 카테고리 이름',
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
    await queryInterface.dropTable('BookCategories');
  },
};
