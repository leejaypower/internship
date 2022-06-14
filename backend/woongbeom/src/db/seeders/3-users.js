module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Heo Woong Beom',
        email: 'gigyesik@barogo.com',
        password: '9252',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kang So Ra',
        email: 'jaeng9@barogo.com',
        password: '2515',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Yang Jin Yeong',
        email: 'bothsides@barogo.com',
        password: '7740',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Park Jeong Hyun',
        email: 'haileypark@barogo.com',
        password: '5601',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Song Ha Rim',
        email: 'hrsong@barogo.com',
        password: '9549',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heo Deok Hyeong',
        email: 'heodh@barogo.com',
        password: '2666',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kim Ki Min',
        email: 'kimin.kim@barogo.com',
        password: '6885',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jeong Joo Yeong',
        email: 'maliethy@barogo.com',
        password: '2288',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ahn Gi Hwan',
        email: 'ahngh0113@barogo.com',
        password: '8543',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lee Jay',
        email: 'jayloper@barogo.com',
        password: '3401',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
