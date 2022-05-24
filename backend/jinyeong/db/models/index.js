/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const cls = require('cls-hooked'); // 트랜잭션을 서비스단에서 비지니스로직으로 처리하기 위한 모듈
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// enable CLS
const namespace = cls.createNamespace('transaction');
Sequelize.useCLS(namespace); // Sequelize Constructor -> 모든 인스턴스에 동일하게 적용

const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
    define: {
      // 테이블 정의 관련 옵션 설정
    },
  },
);

// 연결 테스트
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database', err);
  });

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
