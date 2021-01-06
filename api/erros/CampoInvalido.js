class CampoInvalido extends Error{

 constructor(campo){
   const mensagem = `O campo ${campo} está inválido, nulo ou não foi informado`;
   super(mensagem);
   this.name = 'CampoInvalido';
   this.idErro = 1;
 }
}

module.exports = CampoInvalido;