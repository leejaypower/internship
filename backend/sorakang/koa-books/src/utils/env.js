const path = require('path');
const dotenv = require('dotenv');

const envFiles = {
  development: '.env.development',
  test: 'test.env',
  production: '.env',
};
dotenv.config({
  path: `${path.resolve(process.cwd())}/${envFiles[`${process.env.NODE_ENV || 'development'}`]}`,
});
