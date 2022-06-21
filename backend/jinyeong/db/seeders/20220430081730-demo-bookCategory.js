/* eslint-disable no-unused-vars */
const createDemoData = () => {
  const data = [];
  for (let i = 1; i <= 5; i += 1) {
    data.push({
      id: i,
      koreanDecimalClassificationCode: i * 100,
      name: `카테고리 샘플${i}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return data;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('BookCategories', createDemoData());
    await queryInterface.sequelize.query('ALTER SEQUENCE "BookCategories_id_seq" RESTART WITH 6');
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BookCategories', null, {});
  },
};
