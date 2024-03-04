// Lembre-se de passar a coleção como terceiro parametro de mongoose.model

async function conectarComBancoMongoDb() {
  try {

    // Trazendo variáveis de ambiente para o arquivo
    require(`dotenv`).config();

    // Configurações e imports
    const mongoose = require(`mongoose`);
    const urlBD = process.env.URL_BD;
    const dbName = process.env.BD_NAME;

    // Conectando ao mongoDB no database correto
    const opcoesMongoDB = { dbName };
    await mongoose.connect(urlBD, opcoesMongoDB);
    if (mongoose.connection.readyState === 1) console.log(`Conectado ao banco de dados ${dbName} no mongoDB`);

    // Verificando QUAIS COLEÇÕES EXISTEM e quais devem ser criadas ou não
    const vetorColecoesNoBanco = await mongoose.connection.db.listCollections().toArray();
    let colecoes = { escolas: false, chapas: false, alunos: false, votos: false };
    vetorColecoesNoBanco.forEach((colecao, indice) => {
      switch (colecao.name) {
        case 'escolas':
          colecoes.escolas = true;
          break;
        case 'chapas':
          colecoes.chapas = true;
          break;
        case 'alunos':
          colecoes.alunos = true;
          break;
        case 'votos':
          colecoes.votos = true;
          break;
      }
    });

    /* PERCORRENDO O OBJETO colecoes PELA CHAVE E CRIANDO A COLEÇÃO QUE ESTIVER COM false(OU SEJA, NÃO EXISTE) */
    const chavesDeColecoes = Object.keys(colecoes);
    chavesDeColecoes.forEach(async (chave, indice) => {
      try {
        if(colecoes[chave] === false) {
          await mongoose.connection.createCollection(chave);
          console.log(`Coleção ${chave} criada`);
        } else {
          console.log(`Coleção ${chave} já existe`);
        }
      } catch (erro) {
        console.error(`Erro no forEach de chavesDeColecoes no arquivo mongodb.js
        ${erro.name}: ${erro.message}`);
      }
    });

  } catch (erro) {
    console.error(`Erro na função conectarComBancoMongoDb no arquivo mongodb.js em conexões
    ${erro.name}: ${erro.message}`);
  }
}

module.exports = conectarComBancoMongoDb;