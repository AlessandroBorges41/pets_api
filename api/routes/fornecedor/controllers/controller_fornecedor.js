const { removeAllListeners } = require('nodemon');
const Modelo = require('../schemas/schema_Fornecedor');

//TabelaFornecedor
module.exports = {
  list(){
    return Modelo.findAll();
  },

  inserir (fornecedor) {
    return Modelo.create(fornecedor);
  },

  async buscarPorId (id) {
    const fornecedor = Modelo.findOne({
      where:{id: id}
    });

    if(!fornecedor){
      throw new Error('Fornecedor não encontrado');
    }
    return fornecedor;
  },

  async atualizar(id, dadosParaAtualizacao){
    return Modelo.update(
      dadosParaAtualizacao,{
        where: { id: id }
      }
    )
  },

  async remover(id){
     return Modelo.destroy({
       where: {id: id}
     })
  }
}