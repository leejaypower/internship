const path = require('path');
const dotenv = require('dotenv');

const envFiles = {
  development: '.env.dev',
  test: '.env.test',
  production: '.env',
};

const { env } = process;

dotenv.config({
  path: `${path.resolve(process.cwd())}/${envFiles[`${env.NODE_ENV || 'development'}`]}`,
});
