module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '해당 컬럼은 사용자의 ID 나타냅니다. ',
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '해당 컬럼은 사용자의 아룸울 나타냅니다. ',
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        comment: '해당 컬럼은 사용자의 email을 나타냅니다. ',
      },
      password: {
        type: DataTypes.STRING(300),
        allowNull: false,
        comment: '해당 컬럼은 사용자의 비밀번호를 나타냅니다.',
      },
      phone: {
        type: DataTypes.STRING(50),
        comment: '해당 컬럼은 사용자의 핸드폰 번호를 나타냅니다. EX) "01043218765"',
      },
      deleteDate: {
        type: DataTypes.DATE,
        comment: '해당 컬럼은 사용자가 회원탈퇴를 한 일자를 나타냅니다. ',
      },
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Rental, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      sourceKey: 'id',
      allowNull: false,
      comment: '해당 컬럼은 사용자가 대여한 사용자의 아이디를 나타냅니다. ',
    });

    User.hasMany(models.Reservation, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      sourceKey: 'id',
      allowNull: false,
      comment: '해당 컬럼은 예약을 한 사용자의 아이디를 나타냅니다. ',
    });

    User.hasMany(models.RentalHistory, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      sourceKey: 'id',
      allowNull: false,
      comment: '해당 컬럼은 대여를 한 사용자의 아이디를 나타냅니다. ',
    });

    User.belongsTo(models.Group, {
      foreignKey: 'groupName',
      onDelete: 'set null',
      targetKey: 'groupName',
      allowNull: false,
      unique: true,
      comment: '해당 컬럼은 사용자의 Role을 나타냅니다. (user , admin) ',
    });

    User.hasMany(models.Review, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      sourceKey: 'id',
      allowNull: false,
      comment: '해당 컬럼은 리뷰를 한 사용자의 아이디를 나타냅니다. ',
    });

    User.hasMany(models.Like, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      sourceKey: 'id',
      allowNull: false,
      comment: '해당 컬럼은 좋아요를 한 사용자의 아이디를 나타냅니다. ',
    });

    User.hasOne(models.LoginInfo, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '해당 컬럼은 로그인 중인 사용자의 Id를 나타냅니다. ',
    });
  };

  return User;
};
