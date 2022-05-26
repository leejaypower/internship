module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    paranoid: true,
  });
  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
    }, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
    Reservation.belongsTo(models.BookInfo, {
      foreignKey: 'bookInfoId',
      targetKey: 'id',
      allowNull: false,
    }, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
  };
  return Reservation;
};
