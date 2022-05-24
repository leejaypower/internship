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
    await queryInterface.bulkInsert('Vendors', createDemoData());
    await queryInterface.sequelize.query('ALTER SEQUENCE "Vendors_id_seq" RESTART WITH 6');
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Vendors', null, {});
  },
};
