module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        name: '카테고리1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '카테고리2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '카테고리3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '카테고리4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  },
};
