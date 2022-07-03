/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('../../config/env');

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  process.env.DATABASE_NAME || 'internship-sora',
  process.env.DATABASE_USERNAME || 'intern',
  process.env.DATABASE_PASSWORD || 'intern',
  {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    dialect: process.env.DATABASE_DIALECT || 'postgres',
    port: process.env.DATABASE_PORT || '6432',
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
    },
  },
);

// models -> instance 생성
fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // db 객체에 instance 저장
    db[model.name] = model;
  });

// associate 존재하면 관계 설정
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
