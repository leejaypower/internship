require('dotenv').config();

const { env } = process;

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_DEV_HOST,
  dialect: 'mysql',
};

const test = {
  username: env.MYSQL_TEST_USERNAME,
  password: env.MYSQL_TEST_PASSWORD,
  database: env.MYSQL_TEST_DATABASE,
  host: env.MYSQL_TEST_HOST,
  dialect: 'mysql',
};

const production = {
  username: env.MYSQL_PRODUCTION_USERNAME,
  password: env.MYSQL_PRODUCTION_PASSWORD,
  database: env.MYSQL_PRODUCTION_DATABASE,
  host: env.MYSQL_PRODUCTION_HOST,
  dialect: 'mysql',
};

module.exports = { development, production, test };
