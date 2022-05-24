module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '관리자 등록번호를 의미합니다.',
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '관리자 이메일 주소를 의미합니다.',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '관리자 비밀번호를 의미합니다.',
      },
      name: {
        type: DataTypes.STRING,
        comment: '관리자 이름을 의미합니다.',
        allowNull: false,
      },
    },
    { timestamps: true },
  );
  return Admin;
};
