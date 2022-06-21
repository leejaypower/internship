module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Admins', [
      {
        name: 'Kim Tae Hyeong',
        email: 'thkim@barogo.com',
        password: '$2b$10$tVvRH7Prj.fCmYg9D63YmuA0HSRvs8ebKw46YCQCM.yuMynCxCCka',
        description: '6804',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Admins', null, {});
  },
};
