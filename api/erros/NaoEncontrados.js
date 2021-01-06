class NaoEncontrado extends Error{

  constructor(){
    //chama o cosntructor da classe extendida
    super('Fornecedor não foi encontrado!');
    this.name = 'NaoEncontrado';
    this.idErro = 0;
  }
}

module.exports = NaoEncontrado;