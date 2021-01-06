const controllerFornecedor = require('../controllers/controller_fornecedor');
const CampoInvalido = require('../../../erros/CampoInvalido');
const DadosNaoFornecidos = require('../../../erros/DadosNaoFornecidos');

class model_Fornecedor {
  //Fornecedor

  //Passando um objeto para metodo construtor
  constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
      this.id = id,
      this.empresa = empresa,
      this.email = email,
      this.categoria = categoria,
      this.dataCriacao = dataCriacao,
      this.dataAtualizacao = dataAtualizacao,
      this.versao = versao
  }

  //Pommise
  async criar(){
    this.validar();
    const resultado = await controllerFornecedor.inserir({
      empresa : this.empresa,
      email : this.email,
      categoria : this.categoria
    });

    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;

  }

  async carregar(){
      const fornecedor = await controllerFornecedor.buscarPorId(this.id)
        this.id = fornecedor.id;
        this.empresa =  fornecedor.empresa;
        this.email = fornecedor.email;
        this.categoria =  fornecedor.categoria;
        this.dataCriacao = fornecedor.dataCriacao;
        this.dataAtualizacao = fornecedor.dataAtualizacao;
        this.versao = fornecedor.versao;
  }

  async atualizar(){
    await controllerFornecedor.buscarPorId(this.id);
    const campos = ['empresa', 'email', 'categoria'];
    const dadosParaAtualizacao = {};

    campos.forEach((campo) =>{
      const valor = this[campo]

      if(typeof valor === 'string' && valor.length > 0 ){
        dadosParaAtualizacao[campo] = valor;
      }
    })

    if(Object.keys(dadosParaAtualizacao).length === 0){
        throw new DadosNaoFornecidos();
    }
    await controllerFornecedor.atualizar(this.id, dadosParaAtualizacao);
  }

  async remover(){
    await controllerFornecedor.remover(this.id);
  }

  validar(){
    const campos = ['empresa', 'email', 'categoria'];

    campos.forEach((campo) =>{
      const valor = this[campo]

      if(typeof valor !== 'string' || valor.length <= 0 ){
        throw new CampoInvalido(campo);
      }
    })


  }

}

module.exports = model_Fornecedor;