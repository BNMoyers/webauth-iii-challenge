const knex = require('knex');
const KnexConfig = require('../knexfiles');

module.exports = knex(knexConfig.development);