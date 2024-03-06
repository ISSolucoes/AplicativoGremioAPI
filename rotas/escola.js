const escolaRouter = require(`express`).Router();
const { EscolaModel }= require(`../models/Escola`);

// Rotas GET - READ
escolaRouter.get(`/`, async (req, res) => {

  /*
    #swagger.tags = ['escolas']
    #swagger.description = 'Rota de busca de escolas'
  */

  try {

    const escolasNoBanco = await EscolaModel.find();
    if( escolasNoBanco.length === 0 ) throw new Error(`Nenhuma escola encontrada`);

    let escolas = [];
    escolasNoBanco.forEach((escola, indice) => {
      const escolaLimpaParaRetorno = {
        id: escola._id,
        nomeEscola: escola.nomeEscola,
        alunos: escola.alunos,
        chapas: escola.chapas
      };
      escolas.push(escolaLimpaParaRetorno);
    });

    res.status = 200;
    res.json( escolas );

  } catch (erro) {

    console.error(`Erro na rota GET no arquivo escola.js
    ${erro.name}: ${erro.message}`);

    res.statusCode = 500;
    res.json({ nomeDoErro: erro.name, mensagem: erro.message });

  }
});

escolaRouter.get(`/:id`, async (req, res) => {

  /*
    #swagger.tags = ['escolas']
    #swagger.description = 'Rota de busca de escolas por ID'
  */
  
  try {

    const { id } = req.params;
    const escolaNoBanco = await EscolaModel.findById(id);
    if( !escolaNoBanco ) throw new Error(`A escola não foi encontrada`);

    const escolaLimpaParaRetorno = {
      id: escola._id,
      nomeEscola: escola.nomeEscola,
      alunos: escola.alunos,
      chapas: escola.chapas
    };

    res.status = 200;
    res.json( escolaLimpaParaRetorno );

  } catch (erro) {

    console.error(`Erro na rota GET com ID no arquivo escola.js
    ${erro.name}: ${erro.message}`);

    res.statusCode = 500;
    res.json( { nomeDoErro: erro.name, mensagem: erro.message } );

  }
});

// Rotas PUT - UPDATE
escolaRouter.put(`/:id`, async (req, res) => {

  /* 
    #swagger.tags = ['escolas']
    #swagger.description = 'Rota de atualização de escolas pelo ID'
  */

  try {

    const { id } = req.params;
    const { nomeEscola, email } = req.body;
    let escola = { nomeEscola, email };

    const escolaNoBanco = await EscolaModel.findByIdAndUpdate(id, escola);
    if( !escolaNoBanco ) throw new Error(`Impossivel atualizar escola, ela não existe no banco.`);

    const escolaAtualizada = await EscolaModel.findById(id);

    const escolaLimpaParaRetorno = {
      id: escolaAtualizada._id,
      nomeEscola: escolaAtualizada.nomeEscola,
      alunos: escolaAtualizada.alunos,
      chapas: escolaAtualizada.chapas
    };

    res.statusCode = 200;
    res.json( escolaLimpaParaRetorno );

  } catch (erro) {

    console.error(`Erro na rota PUT com ID no arquivo escola.js
    ${erro.name}: ${erro.message}`);

    res.statusCode = 500;
    res.json( { nomeDoErro: erro.name, mensagem: erro.message } );

  }
});

module.exports = escolaRouter;