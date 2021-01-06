const ValorNaoSuportado = require("./erros/ValorNaoSuportado");

class Serializador {

    json(dados) {
      return JSON.stringify(dados);
    }

    serializar (dados){
       if(this.contentType === 'application/json'){
         return this.json(
           this.filtrar(dados)
         );
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

   constructor(contentType){
       super();
       this.contentType = contentType;
       this.camposPublicos = ['id' , 'empresa', 'categoria', 'email']
   }

}

module.exports = {
  Serializador: Serializador,
  SerializadorFornecedor: SerializadorFornecedor,
  formatosSuportados: ['application/json']
}