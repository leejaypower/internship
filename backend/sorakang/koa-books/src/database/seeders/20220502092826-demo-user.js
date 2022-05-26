// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        name: '강소라',
        email: 'sora1@barogo.com',
        password: '111',
        phone: '01011111111',
        deleteDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        id: uuidv4(),
        name: '박정현',
        email: 'sora2@barogo.com',
        password: '111',
        phone: '01011111111',
        deleteDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: '송하림',
        email: 'sora3@barogo.com',
        password: '111',
        phone: '01011111111',
        deleteDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: '양진형',
        email: 'sora4@barogo.com',
        password: '111',
        phone: '01011111111',
        deleteDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: '허웅범',
        email: 'sora5@barogo.com',
        password: '111',
        phone: '01011111111',
        deleteDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
