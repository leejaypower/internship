module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '도서명',
      },
      category: {
        type: Sequelize.STRING(10),
        allowNull: false,
        comment: '도서 카테고리',
      },
      author: {
        type: Sequelize.STRING(10),
        allowNull: false,
        comment: '도서 작자',
      },
      publisher: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: '도서 발행사',
      },
      discription: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: '도서 소개',
      },
      state: {
        type: Sequelize.STRING(5),
        allowNull: false,
        comment: '도서 상태(대기,대출,예약,분실)',
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
    await queryInterface.dropTable('Books');
  },
};
