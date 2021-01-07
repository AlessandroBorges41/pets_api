const express = require('express');
const config = require('config');
const app = express();
const bodyParser = require('body-parser');
const port = config.get('api.port');
const NaoEncontrado = require('./erros/NaoEncontrados');
const formatosSuportados = require('./Serializador').formatosSuportados;
//Usando como um plugin o BodyParser na aplicação
app.use(bodyParser.json());

const router = require('./routes/fornecedor');
const { response, request } = require('express');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('../api/erros/ValorNaoSuportado');
const SerializadorErro = require('./Serializador').SerializadorErro;

//Declarando um Middleware:  middlewareType
app.use((request, response, middlewareType)=>{
   let formatoRequisitado = request.header('Accept');

   if(formatoRequisitado === '*/*'){
     formatoRequisitado = 'application/json';
   }

   if(formatosSuportados.indexOf(formatoRequisitado) === -1){
      response.status(406).end();
      return
   }

    response.setHeader('Content-Type', formatoRequisitado);
    middlewareType();   
});

//chamando as rotas
app.use('/api/fornecedor', router);

app.use((erro, request, response, middlewareError) =>{
    let status = 500;

    if(erro instanceof NaoEncontrado){
      status = 404;
    } else {
      status = 400;
    }

    if(erro instanceof  CampoInvalido || erro instanceof DadosNaoFornecidos){
      status = 400;
    }

    if(erro instanceof ValorNaoSuportado){
      status = 406;
    }

    const serializadoErro = new SerializadorErro(
      response.getHeader('Content-Type')
    )
    
    response.status(status)
    response.send(serializadoErro.serializar({
      mensagem: erro.message,
      id: erro.idErro,
      'success': false
    }))
});

app.listen(port, () => {
  console.log(`Server executando na Porta ${port}`);
});