/* eslint-disable no-unused-vars */
const createDemoData = () => {
  const data = [];
  for (let i = 1; i <= 5; i += 1) {
    data.push({
      id: i,
      name: `도서명 샘플${i}`,
      category: '카테고리 샘플',
      author: '작자 샘플',
      publisher: '발행사 샘플',
      discription: '책 설명 샘플',
      state: '대기',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return data;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', createDemoData());
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  },
};
