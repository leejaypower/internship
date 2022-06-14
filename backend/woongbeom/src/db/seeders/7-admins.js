module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Admins', [
      {
        name: 'Kim Tae Hyeong',
        email: 'thkim@barogo.com',
        password: '6804',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Admins', null, {});
  },
};
