const Sequelize = require('sequelize');
const instancia = require('../../../bd');

//ModeloTabelaFornecedor

const columns = {
   empresa: {
     type: Sequelize.STRING,
     allowNull: false
   },
   email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  categoria: {
    type: Sequelize.ENUM('ração', 'briquedos'),
    allowNull: false
  }
}

const options = {
  freezeTableName: true,
  tableName: 'fornecedores',
  timestamps: true,
  createdAt: 'dataCriacao',
  updatedAt: 'dataAtualizacao',
  version: 'versao'
}

module.exports = instancia.define('fornecedor', columns, options);