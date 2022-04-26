module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', [
      {
        content: '댓글 내용1',
        postId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: '댓글 내용2',
        postId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: '댓글 내용3',
        postId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: '댓글 내용4',
        postId: 2,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: '댓글 내용5',
        postId: 3,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: '댓글 내용6',
        postId: 3,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: '댓글 내용7',
        postId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Comments', null, {});
  },
};
