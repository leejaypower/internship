module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Groups', [
      {
        groupName: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        groupName: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Groups', null, {});
  },
};
// npx sequelize-cli db:seed --seed 20220512025129-group.js
