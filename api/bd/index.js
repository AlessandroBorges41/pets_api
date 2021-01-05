const Sequelize = require('sequelize');
const config = require('config');

const instancia = new Sequelize(
  config.get('mysql.bd'),
  config.get('mysql.user'),
  config.get('mysql.pwd'),
  {
    host: config.get('mysql.host'),
    dialect: 'mysql'
  }

);

module.exports = instancia;