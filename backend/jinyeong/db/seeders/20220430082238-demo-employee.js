/* eslint-disable no-unused-vars */
const createDemoData = () => {
  const data = [];
  for (let i = 1; i <= 5; i += 1) {
    data.push({
      id: i,
      name: `직원 샘플${i}`,
      contact: '010-1234-5678',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return data;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Employees', createDemoData());
    await queryInterface.sequelize.query('ALTER SEQUENCE "Employees_id_seq" RESTART WITH 6');
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Employees', null, {});
  },
};
