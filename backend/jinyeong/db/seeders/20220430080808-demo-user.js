/* eslint-disable no-unused-vars */
const { v4 } = require('uuid');

const createDemoData = () => {
  const data = [];
  for (let i = 1; i <= 5; i += 1) {
    data.push({
      id: v4(),
      name: `유저 샘플 ${i}`,
      contact: '010-1234-1234',
      email: `example${i}.barogo.com`,
      password: `password${i}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return data;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', createDemoData());
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
