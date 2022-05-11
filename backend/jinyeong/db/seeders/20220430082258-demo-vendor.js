/* eslint-disable no-unused-vars */
const createDemoData = () => {
  const data = [];
  for (let i = 1; i <= 5; i += 1) {
    data.push({
      id: i,
      vendorName: `거래처 샘플 ${i}`,
      managerName: `거래처 샘플 ${i}`,
      contact: `거래처 샘플 ${i}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return data;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Vendors', createDemoData());
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Vendors', null, {});
  },
};
