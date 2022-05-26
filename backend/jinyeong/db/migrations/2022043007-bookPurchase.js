module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookPurchases', {
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
        comment: '도서 ID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Vendors',
          },
          key: 'id',
        },
        onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
        onUpdate: 'CASCADE',
        comment: '거래처 ID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      historicalCost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '도서 구매가',
      },
      purchaseDate: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '도서 구입일',
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
    await queryInterface.dropTable('BookPurchases');
  },
};
