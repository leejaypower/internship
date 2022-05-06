module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      movieId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Movies',
          },
          key: 'id',
        },
      },
      comment: {
        type: Sequelize.STRING,
      },
      movieScore: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Reviews');
  },
};
