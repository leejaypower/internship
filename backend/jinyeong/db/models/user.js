module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: '유저 이름',
    },
    contact: {
      type: DataTypes.STRING(32), // secret hex code(32bytes)
      allowNull: false,
      comment: '유저 연락처',
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true, // 이메일로 유저를 식별하기 위해 중복되지 않도록 설정.
      comment: '유저 이메일',
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      comment: '유저 비밀번호',
    },
    isBlacklist: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '블랙리스트 여부',
    },
    accessToken: {
      type: DataTypes.STRING(300), // jwt(액세스토큰)
      allowNull: true,
    },
  }, {
    // 추가 옵션 설정
    paranoid: true, // 소프트 딜리트 옵션 적용(deleteAt 칼럼에 삭제날짜 표시)
  });

  User.associate = (models) => {
    User.hasMany(models.Reservation, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
    User.hasMany(models.Rental, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
  };

  return User;
};
