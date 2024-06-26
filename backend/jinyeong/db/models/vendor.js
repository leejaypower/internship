module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    vendorName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '거래처명',
    },
    managerName: {
      type: DataTypes.STRING(10),
      comment: '담당자 이름',
    },
    contact: {
      type: DataTypes.STRING(13),
      allowNull: false,
      comment: '연락처',
    },
  }, {
    // 추가 옵션 설정
    paranoid: true, // 소프트 딜리트 옵션 적용(deleteAt 칼럼에 삭제날짜 표시)
  });

  Vendor.associate = (models) => {
    Vendor.hasMany(models.BookPurchase, {
      foreignKey: 'vendorId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
  };

  return Vendor;
};
