const path = require('path');
const dotenv = require('dotenv');

const envFiles = [];
envFiles.dev = 'dev.env';
envFiles.test = 'test.env';
envFiles.prod = '.env';

dotenv.config({
  path: `${path.resolve(process.cwd())}/${envFiles[process.env.NODE_ENV]}`,
});
