const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const path = require('path');
const dotenv = require('dotenv');

// set environment variable globally
const env = process.env.NODE_ENV || 'development';
const dirName = path.resolve('./', `.env.${env}`);
dotenv.config({ path: dirName });

const { sequelize } = require('../database/models/index');

const app = new Koa();

// middleware
app.use(cors());
app.use(bodyParser());

// db connection test and sync
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully!');
  })
  .then(sequelize.sync({ force: true }))
  .catch((err) => {
    console.error('Unable to connect to the database', err);
  });

module.exports = app;
