const escolaRouter = require('./rotas/escola');

async function main() {
  try {

    // Adicionando variáveis de desenvolvimento
    const swaggerUi = require(`swagger-ui-express`);
    const documentoSwagger = require(`./swagger-output.json`);

    // Adicionando variáveis de ambiente á process.env
    require(`dotenv`).config();

    // CONSTANTES 
    const express = require(`express`);
    const porta = process.env.PORTA;
    const app = express();

    // IMPORT DE MIDDLEWARES PERSONALIZADOS


    // USO DE MIDDLEWARES INTERNOS
    app.use( express.urlencoded( { extended: true } ) );
    app.use( express.json() );
    
    // USO DE MIDDLEWARES PERSONALIZADOS


    // ROTAS
    const escolaRouter = require('./rotas/escola');
    // USO DE ROTAS
    app.use(`/escola`, escolaRouter);
    // USO DE ROTAS DE DESENVOLVIMENTO
    app.use(`/`, swaggerUi.serve, swaggerUi.setup(documentoSwagger));

    // CONEXÃO COM O BANCO
    const conectarComBancoMongoDb = require(`./conexoes/mongodb`);
    await conectarComBancoMongoDb();

    // SERVIDOR OUVINDO NA PORTA ESPECIFICADA
    app.listen(porta, () => {
      console.log(`Servindo na porta ${porta}`);
    });

  } catch (erro) {
    console.error(`Erro na função main no arquivo main.js
    ${erro.name}: ${erro.message}`);
  }
};

main();