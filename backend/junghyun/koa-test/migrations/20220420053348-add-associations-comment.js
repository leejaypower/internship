module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Comments',
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
      'Comments',
      'postId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Comments',
      'userId',
    );
    await queryInterface.removeColumn(
      'Comments',
      'postId',
    );
  },
};
