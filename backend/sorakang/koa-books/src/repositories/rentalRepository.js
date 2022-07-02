const { sequelize } = require('../database/models');
const { Rental, RentalHistory } = require('../database/models');

/**
 * 모든 대출 내역 조회
 */
const getAllRental = async () => {
  const rentalList = await Rental.findAll({
    raw: true,
  });
  return { rentalList };
};

/**
 * 특정 book 또는 userId에 대한 대출 정보 조회
 * [Input]
 * query : userId 또는 bookId
 */
const getRentalInfo = async (input) => {
  const rentalList = await Rental.findAll({
    where: input,
    returning: ['*'],
  });

  return { rentalList };
};

/**
 * 한 개의 대여 정보 조회
 * [Input]
 * rentalId : PK
 */
const getSingleRental = async (rentalId) => {
  const rental = await Rental.findByPk(rentalId, { raw: true });

  return { rental };
};

/**
 * 책 대여 생성 - 유저, 관리자
 * [Input]
 * userId : 대여를 할 사용자 ID
 * bookId : 대여 할 책의 serial number (추구 변수명 수정 예정)
 * returnDate : 반납일자
 */
const createRental = async (userId, bookId, returnDate) => {
  const input = {
    rentalDate: new Date(),
    returnDate,
    state: true,
    overdue: null,
    userId,
    bookId,
    isExtend: 1,
  };

  const [rental, isCreated] = await Rental.findOrCreate({
    where: { bookId },
    defaults: { ...input },
  });
  return { rental, isCreated };
};

/**
 * 대여 연장 - 유저, 관리자
 * [Input]
 * bookId : bookId : 연장할 책의 Serial number (곧 변수명 bookSerial로 변경 예정입니다.)
 * rentalId : 대여 ID
 * extDay : 연장일
 */
const extendRentDate = async (rentalId, extDate) => {
  const updatedCount = await Rental.update(
    { returnDate: extDate, isExtend: 0 },
    { where: { id: rentalId } },
  );
  return { updatedCount };
};

/**
 * 책 대여 삭제 - 유저, 관리자
 * [Input]
 * rentalId : 반납 할 대여 ID
 * rentHistoryInfo : 대여 히스토리 테이블에 저장 할 정보
 */
const returnRental = async (bookId, rentHistoryInfo) => {
  const t = await sequelize.transaction();

  const isDeleted = await Rental.destroy({ where: { bookId }, t });
  const rentHistory = await RentalHistory.create(rentHistoryInfo, { t });

  return { isDeleted, rentHistory };
};

// const updateRental = async (attributes, whereOptions) => {
//   const result = await sequelize.transaction(async (t) => {
//     const rentalUpdatedCount = await Rental.update(attributes, whereOptions, { transaction: t });

//     const { rental } = await getSingleRental(whereOptions.where.id);

//     const {
//       userId, returnDate, rentalDate, overdue,
//     } = rental;

//     const rentHistory = await RentalHistory.create({
//       userId, returnDate, rentalDate, overdue,
//     }, { transaction: t });

//     return { rentalUpdatedCount, rentHistory };
//   });
//   return result;
// };
// 임시
const returnRentalKafka = async (bookId) => {
  const t = await sequelize.transaction();

  const isDeleted = await Rental.destroy({ where: { bookId }, t });

  return { isDeleted };
};

module.exports = {
  getAllRental,
  getRentalInfo,
  getSingleRental,
  createRental,
  extendRentDate,
  returnRental,
  returnRentalKafka,
};
