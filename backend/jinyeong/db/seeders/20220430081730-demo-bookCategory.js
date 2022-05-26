/* eslint-disable no-unused-vars */
const createDemoData = () => {
  const data = [];
  for (let i = 1; i <= 5; i += 1) {
    data.push({
      id: i,
      KDC: i * 100,
      name: `카테고리 샘플${i}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return data;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('BookCategories', createDemoData());
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BookCategories', null, {});
  },
};
