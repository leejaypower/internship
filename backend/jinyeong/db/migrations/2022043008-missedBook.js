module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MissedBooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Books',
          },
          key: 'id',
        },
        onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
        onUpdate: 'CASCADE',
        comment: '분실도서 ID',
      },
      missedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '도서 분실일 또는 분실사실을 알게된 날',
      },
      missedReason: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: '도서 분실사유',
      },
      returnDate: {
        type: Sequelize.DATE,
        comment: '분실도서 회수일',
      },
      returnReason: {
        type: Sequelize.STRING(100),
        comment: '분실도서 회수사유',
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
    await queryInterface.dropTable('MissedBooks');
  },
};
