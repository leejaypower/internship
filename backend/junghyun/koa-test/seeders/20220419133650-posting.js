module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Posts', [
      {
        title: '제목1',
        content: '내용1',
        categoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '제목2',
        content: '내용2',
        categoryId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '제목3',
        content: '내용3',
        categoryId: 3,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '제목4',
        content: '내용4',
        categoryId: 4,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {});
  },
};
