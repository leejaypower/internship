module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Books', [
      {
        title: '자유로울 것',
        author: '임경선',
        publisher: '위즈덤하우스',
        page: 287,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '젊은 베르테르의 슬픔',
        author: '요한 볼프강 폰 괴테',
        publisher: '민음사',
        page: 244,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Principles (원칙)',
        author: 'Ray Dalio (레이 달리오)',
        publisher: '한빛비즈',
        page: 715,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '위대한 기업에 투자하라',
        author: '워렌 버핏',
        publisher: '굿모닝북스',
        page: 715,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Do it! 점프 투 파이썬',
        author: '박응용',
        publisher: '이지스퍼블리싱',
        page: 356,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Clean Code (클린 코드)',
        author: '로버트 C. 마틴',
        publisher: '인사이트',
        page: 584,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
