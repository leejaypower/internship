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
    },
    contact: {
      type: DataTypes.STRING(32), // secret hex code(32bytes)
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true, // 이메일로 유저를 식별하기 위해 중복되지 않도록 설정.
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    isBlacklist: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
  });

  User.associate = (models) => {
    User.hasMany(models.Reservation, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    User.hasMany(models.Rental, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return User;
};
