const modeloTabela = require('../routes/fornecedor/schemas/schema_Fornecedor');

//Usando uma Promise com .then 
modeloTabela
  .sync()
  .then(() => console.log('Tabela criada com sucesso'))
  .catch(() => console.log)
