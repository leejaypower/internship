module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      directors: {
        type: Sequelize.STRING,
      },
      actors: {
        type: Sequelize.STRING,
      },
      releaseDate: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.STRING,
      },
      poster: {
        type: Sequelize.STRING,
      },
      plot: {
        type: Sequelize.STRING,
      },
      runtime: {
        type: Sequelize.INTEGER,
      },
      kmdbUrl: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Movies');
  },
};
