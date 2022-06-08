module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookInfoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'BookInfo',
          },
          key: 'id',
        },
        onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
        onUpdate: 'CASCADE',
        comment: '도서의 정보(도서명, 카테고리, 작자, 발행사, 소개)를 담고 있는 테이블 아이디',
      },
      state: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'BOOK_STATE_WAITING',
        comment: '도서의 상태(대기,대출,예약,분실)를 표시',
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
    await queryInterface.dropTable('Books');
  },
};
