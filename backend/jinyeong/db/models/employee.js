module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
  }, {
    // 추가 옵션 설정
  });

  Employee.associate = (models) => {
    Employee.hasOne(models.Admin, {
      foreignKey: 'employeeId',
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Employee;
};
