module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Posts',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
    await queryInterface.addColumn(
      'Posts',
      'categoryId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Posts',
      'userId',
    );
    await queryInterface.removeColumn(
      'Posts',
      'categoryId',
    );
  },
};
