module.exports = (sequelize, DataTypes) => {
  const LostBook = sequelize.define('LostBook', {
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
  LostBook.associate = (models) => {
    LostBook.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
    }, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
    LostBook.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
    }, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
  };
  return LostBook;
};
