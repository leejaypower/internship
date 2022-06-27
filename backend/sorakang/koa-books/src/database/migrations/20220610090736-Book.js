module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '도서의 id 데이터를 담고 있습니다.',
      },
      title: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: '해당 컬럼은 도서의 제목을 나타냅니다. ',
      },
      authors: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: '해당 컬럼은 도서의 저자 리스트를 나타냅니다. ex)저자1,저자2,저자3.. ',
      },
      isbn: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        comment: '해당 컬럼은 도서의 고유 번호를 나타냅니다',
      },
      content: {
        type: Sequelize.TEXT,
        comment: '해당 컬럼은 헤당 도서에 대한 소개글을 나타냅니다.',
      },
      publisher: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: '해당 컬럼은 출판사 정보를 나타냅니다. ',
      },
      publicationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '해당 컬럼은 도서의 출간일을 나타냅니다.',
      },
      thumbnail: {
        type: Sequelize.STRING(2048),
        comment: '해당 컬럼은 도서의 썸네일 이미지의 URL을 나타냅니다.',
      },
      category: {
        type: Sequelize.STRING(100),
        comment: '해당 컬럼은 해당 도서가 속해있는 카테고리를 나타냅니다. ',
      },
      bookLocation: {
        type: Sequelize.STRING(100),
        comment: '해당 컬럼은 해당 도서의 위치 정보를 나타냅니다.',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  },
};
