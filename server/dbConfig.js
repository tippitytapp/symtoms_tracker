const knex = require('knex');
require('dotenv').config();
const knexConfig = require('../knexfile.js');
const ENV = process.env.NODE_ENV;
module.exports = knex(knexConfig[ENV]);