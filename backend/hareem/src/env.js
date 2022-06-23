const path = require('path');
const dotenv = require('dotenv');

const envFiles = {
  development: 'dev.env',
  test: 'test.env',
  production: '.env',
};

console.log(process.cwd());

dotenv.config({
  path: `${path.resolve(process.cwd())}/${envFiles[`${process.env.NODE_ENV || 'development'}`]}`,
});
