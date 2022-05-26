module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookInfo', {
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
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'BookCategories',
          },
          key: 'id',
        },
        onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
        onUpdate: 'CASCADE',
        comment: '외래키(FK), 도서 카테고리 정보를 담은 테이블 연결',
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
        defaultValue: '대기',
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
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('BookInfo');
  },
};
