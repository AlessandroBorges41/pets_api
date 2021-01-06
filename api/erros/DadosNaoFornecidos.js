class DadosNaoFornecidos extends Error {
  
  constructor () {
     //chama o cosntructor da classe extendida
     super('Não foram fornecidos dados para atualizar!');
     this.name = 'DadosNaoFornecidos';
     this.idErro = 2;
  }
}

module.exports = DadosNaoFornecidos;