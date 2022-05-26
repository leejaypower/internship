module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      comment: '예약신청 유저ID',
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '예약된 도서ID',
    },
    reservedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: '예약 신청일',
    },
    state: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: 'RESERVATION_STATE_WAITING',
      comment: '예약이력에 대한 상태정보입니다. [대기, 실행, 취소]로 구분됩니다.',
    },
  }, {
    // 추가 옵션 설정
    paranoid: true, // 소프트 딜리트 옵션 적용(deleteAt 칼럼에 삭제날짜 표시)
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
    Reservation.belongsTo(models.Book, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
  };

  return Reservation;
};
