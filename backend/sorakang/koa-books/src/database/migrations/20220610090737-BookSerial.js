module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookSerials', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '도서리얼번호의 id 데이터를 담고 있습니다.',
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Books',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: '해당 컬럼은 시리얼 넘버에 해당되는 도서의 도서ID를 나타냅니다.',
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
    await queryInterface.dropTable('BookSerials');
  },
};
