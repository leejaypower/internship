module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tags', [
      {
        name: '태그1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '태그2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '태그3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '태그4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tags', null, {});
  },
};
