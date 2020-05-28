require('dotenv').config();
const Sequelize = require('sequelize');
const Env = require('./env');
const config = require(`../sequelize/config/config.json`)[Env.current || process.env.ENV];

// eslint-disable-next-line no-console
config.pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};

module.exports = new Sequelize(
  config.database, config.username, config.password, config
);