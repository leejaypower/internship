const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
  dotenv.config({ path: path.join(__dirname, 'path/to/.env.production') });
} else if (env === 'develop') {
  dotenv.config({ path: path.join(__dirname, 'path/to/.env.develop') });
} else if (env === 'test') {
  dotenv.config({ path: path.join(__dirname, 'path/to/.env.test') });
}

const config = require(`${__dirname}/../config/index.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs.readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  ))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
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
