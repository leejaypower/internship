module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Statuses', [
      {
        id: 0,
        description: '대출 가능',
      },
      {
        id: 1,
        description: '대출 불가',
      },
      {
        id: 2,
        description: '대출 불가, 예약중',
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Statuses', null, {});
  },
};

/**
 * TODO
 * status 를 숫자값이 아닌 ENUM 으로 관리하는 것에 대해 고민해보자.
 * enum type 이해, status 테이블 유지 여부 등에 대하여도 고민해보자.
 */
