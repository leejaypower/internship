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
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(16),
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
    });
    User.hasMany(models.Rental, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
    });
  };

  return User;
};
