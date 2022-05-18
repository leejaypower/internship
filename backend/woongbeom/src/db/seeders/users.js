module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Heo Woong Beom',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kang So Ra',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Yang Jin Yeoung',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Park Jeong Hyun',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Song Ha Rim',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heo Deok Hyeong',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kim Ki Min',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jeong Joo Yeong',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ahn Gi Hwan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lee Jay',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
