const { sequelize } = require('../db/models');
const repository = require('../repository');
const lib = require('../lib');
const kafka = require('../kafka');

const { errorHandler } = lib.util.error;
const { constant } = lib.common;

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
  if (book.statusCode === constant.bookStatus.availableForRental) {
    errorHandler(1, 'This book is already returned');
  }

  if (book.statusCode === constant.bookStatus.reserved) {
    const topicName = constant.topic.returnReservedBook;
    await kafka.producer.messageSender.produceMessage(topicName, book);
  }

  const result = await sequelize.transaction(async (transaction) => {
    const status = { statusCode: constant.bookStatus.availableForRental };
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
 * 도서 반납 함수의 인풋이 적절한가?
 * bookId 를 받는 것이 더 적절하지 않을까?

 * ToDo
 * 트랜젝션과 DB처리에 대해 더 공부하자.
 * 조회는 트랜젝션 로직에 포함될 필요가 없다.
 * { transaction } 뿐 아니라 트랜젝션 범위 안에 있으면 같이 롤백. 다른 메서드들도 범위 설정 다시.
 * 생각했으면 그저 돌아갈 확률이 높은 쪽을 적용하지 말고, 적용을 둘다 해보고 리뷰를 요청하자.
 *
 * ToDo
 * 다른 파일들도 도서 상태코드를 ENUM으로 관리하자. DB에서만 사용하는 것이 아닌 코드에서도 적용가능!
 */
