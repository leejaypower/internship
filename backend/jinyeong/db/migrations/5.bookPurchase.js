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
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('BookPurchases');
  },
};
