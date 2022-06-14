module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define(
    'Status',
    {
      id: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '도서의 상태 코드를 나타냅니다',
        defaultValue: 0, // migration 진행중이어서 기본값을 설정해두었습니다.
        primaryKey: true,
      },
      discription: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '상태 코드에 대한 설명을 나타냅니다.',
      },
    },
    { timestamps: false },
  );
  Status.associate = (models) => {
    Status.hasMany(models.Book, {
      foreignKey: 'statusCode',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '하나의 상태는 여러 책을 갖는 것이 가능합니다.',
    });
  };
  return Status;
};
