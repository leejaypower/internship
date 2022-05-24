module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    vendorName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    managerName: DataTypes.STRING(10),
    contact: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
  }, {
    // 추가 옵션 설정
  });

  Vendor.associate = (models) => {
    Vendor.hasMany(models.BookPurchase, {
      foreignKey: 'vendorId',
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Vendor;
};
