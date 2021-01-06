const { removeAllListeners } = require('nodemon');
const Modelo = require('../schemas/schema_Fornecedor');
const NaoEncontrado = require('../../../erros/NaoEncontrados');

//TabelaFornecedor
module.exports = {
  list(){
    //A informação de raw: true retorna JavaScript puro
    return Modelo.findAll({ raw: true});
  },

  inserir (fornecedor) {
    return Modelo.create(fornecedor);
  },

  async buscarPorId (id) {
    const fornecedor = await Modelo.findOne({
      where:{id: id}
    });

    if(!fornecedor){
      throw new NaoEncontrado();
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