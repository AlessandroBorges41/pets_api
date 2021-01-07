const ValorNaoSuportado = require("./erros/ValorNaoSuportado");
const jsontoxml = require('jsontoxml');

class Serializador {

    json(dados) {
      return JSON.stringify(dados);
    }

    xml(dados){
      let tag = this.tagSingular

      if(Array.isArray(dados)){
        tag = this.tagPlural
        //formando o o grupo de dados para cadas fornecedor 
        //que depois será tranformado em um nó dentro do XML
        dados = dados.map((item) => {
          return {
            [this.tagSingular]: item 
          }
        })

      }
      return jsontoxml({ [tag]: dados});
    }

    serializar (dados){
       //Usando a function filtrar os dados
       dados = this.filtrar(dados)
       if(this.contentType === 'application/json'){
         return this.json(dados)
       }

       if (this.contentType === 'application/xml') {
        return this.xml(dados)
       }
       throw new ValorNaoSuportado(this.contentType)
    }

    filtrarObjeto (dados){
       const newObject = {}
       
       //Separando os campos publicos
       this.camposPublicos.forEach((campo) => {
          if(dados.hasOwnProperty(campo)) {
            newObject[campo] = dados[campo]
          }
       })
        return newObject
    }

    filtrar(dados){
      if(Array.isArray(dados)){
          dados = dados.map(item => {
            return this.filtrarObjeto(item)
          })
      } else {
        dados = this.filtrarObjeto(dados)
      }
      return dados
    }

  }


class SerializadorFornecedor extends Serializador{

   constructor(contentType, camposExtras){
       super();
       this.contentType = contentType;
       this.camposPublicos = ['id' , 'empresa', 'categoria', 'email'].concat(camposExtras || [])
       this.tagSingular = 'fornecedor'
       this.tagPlural = 'fornecedores'
   }

}

class SerializadorErro extends Serializador{
   constructor (contentType, camposExtras){
       super();
       this.contentType = contentType
       this.camposPublicos = [
        'id' , 'mensagem'
       ].concat(camposExtras || [])
       this.tagSingular = 'erro'
       this.tagPlural = 'erros'
   }
}

module.exports = {
  Serializador: Serializador,
  SerializadorFornecedor: SerializadorFornecedor,
  SerializadorErro: SerializadorErro,
  formatosSuportados: ['application/json', 'application/xml']
}