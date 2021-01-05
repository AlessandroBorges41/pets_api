const rotas = require('express').Router();
const Fornecedor = require('./models/model_fornecedor');

const { request, response } = require('express');
//Utilizando modelotbFornececor para ser usado
const objFornecedor = require('./controllers/controller_fornecedor');

rotas.get('/', async (request, response) => {

    try {
        const resultados = await objFornecedor.list();
        response.status(200).json(resultados);
    } catch (error) {
        response.status(400).json({"mensage": error.message, "success" : false});
    }

    
});

rotas.post('/', async (request, response) =>{
    try {
        const dados = request.body;
        const fornecedor = new Fornecedor(dados)
        await fornecedor.criar()
        response.status(201).json({fornecedor, "success": true})
    } catch (error) {
        response.status(400).json({"mensage": error.message, "success" : false})
    }
});

rotas.get('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.carregar();
        response.status(200).json(fornecedor);
    } catch (error) {
        response.status(400).json({"mensagem" : error.message, 'success': false});
    }
});

rotas.put('/:id', async (request, response) =>{
   

    try {
        const id = request.params.id;
        const dados = request.body;
        //unido vários objetos em um só
        const dadosAssing = Object.assign({}, dados, {id : id});
        const fornecedor = new Fornecedor(dadosAssing);
        await fornecedor.atualizar();
        response.status(204).json({'success': true});
    } catch (error) {
        response.status(400).json({'mensagem': error.message, 'success': false});
    }

});

rotas.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        //Instancia e passa o valor do id para quando chamar os metodos de carregar
        //e remover já terá o Id para usar como o this.id
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.carregar();
        await fornecedor.remover();
        response.status(204).json({'success': true});
    } catch (erro) {
        response.status(400).json({'mensagem': erro.message, 'success': false});
    }
});


module.exports = rotas;