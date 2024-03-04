const escolaRouter = require(`express`).Router();

// Rotas GET - READ
escolaRouter.get(`/`, async (req, res) => {

  /*
    #swagger.tags = ['escolas']
    #swagger.description = 'Rota de busca de escolas'
  */

  try {

    res.statusCode = 200;
    res.json({});

  } catch (erro) {

    console.error(`Erro na rota GET no arquivo escola.js
    ${erro.name}: ${erro.message}`);
    res.statusCode = 500;
    res.json({ nomeDoErro: erro.name, mensagem: erro.message });

  }
});

module.exports = escolaRouter;