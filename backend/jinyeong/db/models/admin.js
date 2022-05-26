module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '관리자 계정 이메일 정보',
    },
    password: {
      type: DataTypes.STRING(16),
      allowNull: false,
      comment: '관리자 계정 비밀번호 정보(암호화)',
    },
  }, {
    // 테이블 추가 옵션 설정
    paranoid: true, // 소프트 딜리트 옵션 적용(deleteAt 칼럼에 삭제날짜 표시)
  });

  return Admin;
};
