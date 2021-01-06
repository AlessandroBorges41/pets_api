const rotas = require('express').Router();
const Fornecedor = require('./models/model_fornecedor');

const { request, response } = require('express');
//Utilizando modelotbFornececor para ser usado
const objFornecedor = require('./controllers/controller_fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;


rotas.get('/', async (request, response, middlewareError) => {

    try {
        const resultados = await objFornecedor.list();
        response.status(200);
        const serializador = new SerializadorFornecedor(
            response.getHeader('Content-Type')
        );
        response.json(serializador.serializar(resultados))
    } catch (erro) {
        middlewareError(erro)
    }
});

rotas.post('/', async (request, response, middlewareError) =>{
    try {
        const dados = request.body;
        const fornecedor = new Fornecedor(dados)
        await fornecedor.criar()
        response.status(201)
        const serializador = new SerializadorFornecedor(
            response.getHeader('Content-Type')
        );
        response.send(serializador.serializar(fornecedor))
    } catch (erro) {
        middlewareError(erro)
    }
});

rotas.get('/:id', async (request, response, middlewareError) => {
    try {
        const id = request.params.id
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        response.status(200)
        const serializador = new SerializadorFornecedor(
            response.getHeader('Content-Type')
        );
        response.send(serializador.serializar(fornecedor))
    } catch (erro) {
        middlewareError(erro)
    }
});

rotas.put('/:id', async (request, response, middlewareError) =>{
   

    try {
        const id = request.params.id;
        const dados = request.body;
        //unido vários objetos em um só
        const dadosAssing = Object.assign({}, dados, {id : id});
        const fornecedor = new Fornecedor(dadosAssing);
        await fornecedor.atualizar();
        response.status(204).json({'success': true});
    } catch (erro) {
        middlewareError(erro);
    }

});

rotas.delete('/:id', async (request, response, middlewareError) => {
    try {
        const id = request.params.id;
        //Instancia e passa o valor do id para quando chamar os metodos de carregar
        //e remover já terá o Id para usar como o this.id
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.carregar();
        await fornecedor.remover();
        response.status(204).json({'success': true});
    } catch (erro) {
        middlewareError(erro);
    }
});

module.exports = rotas;