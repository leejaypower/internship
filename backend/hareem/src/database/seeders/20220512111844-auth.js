module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Auths', [{
      role: 'user',
      refreshToken: null,
      updatedAt: new Date(),
      userId: '89704461-9949-4bd4-9814-0e78844ba97a',
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Auths', null, {});
  },
};
