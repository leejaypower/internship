const { errorHandler } = require('../../lib/util/error');
const { sequelize } = require('../db/models');
const repository = require('../repository');

/**
 * 도서 반납
 * @param { Number } rentalId 도서 대여 번호 
 */
const createReturn = async (rentalId) => {
  const rental = await repository.rental.getRentalById(rentalId);
  if (!rental) {
    errorHandler(1, 'This rent number does not exit.');
  }

  const book = await repository.book.getBookById(rental.bookId);
  if (book.statusCode === 0) {
    errorHandler(1, 'This book is already returned');
  }

  const result = await sequelize.transaction(async (transaction) => {
    const status = { statusCode: 0 };
    await repository.book.updateBook(
      rental.bookId,
      status,
      { transaction },
    );

    const newReturn = await repository.returnBook.createReturn(rentalId, { transaction });
    return newReturn;
  });
  return result;
};

module.exports = {
  createReturn,
};

/**
 * ToDo
 * 트랜젝션과 DB처리에 대해 더 공부하자.
 * 조회는 트랜젝션 로직에 포함될 필요가 없다.
 * { transaction } 뿐 아니라 트랜젝션 범위 안에 있으면 같이 롤백. 다른 메서드들도 범위 설정 다시.
 * 생각했으면 그저 돌아갈 확률이 높은 쪽을 적용하지 말고, 적용을 둘다 해보고 리뷰를 요청하자. 
 */