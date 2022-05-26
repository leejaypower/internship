// const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'Group',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      groupName: {
        type: DataTypes.STRING(100),
        unique: true,
        comment: '해당 컬럼은 사용자가 가질 수 있는 group 대한 명칭을 나타냅니다. ex) Administrator ,User ',
      },

    },
  );

  Group.associate = (models) => {
    models.Group.hasMany(models.User, {
      foreignKey: 'groupName',
      onDelete: 'set null',
      sourceKey: 'groupName',
      allowNull: false,
      comment: '해당 컬럼은 헤딩 Group에 속해있는 사용자의 ID를 나타냅니다. ',
    });
  };

  return Group;
};
