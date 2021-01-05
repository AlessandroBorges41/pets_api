const express = require('express');
const config = require('config');
const app = express();
const bodyParser = require('body-parser');
const port = config.get('api.port');
//Usando como um plugin o BodyParser na aplicação
app.use(bodyParser.json());

const router = require('./routes/fornecedor');

//chamando as rotas
app.use('/api/fornecedor', router);

app.listen(port, () => {
  console.log(`Server executando na Porta ${port}`);
});