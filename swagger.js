async function runSwaggerAndStart() {
  try {

    const swaggerAutogen = require(`swagger-autogen`)();

    const doc = {
      info: {
        version: `1.0.0`,
        title: `API - Aplicativo Grêmio`,
        description: `API para interação entre aplicativo e banco de dados com autorização e autenticação.`
      },
      host: `localhost:3000`,
      schemes: [`http`],
      consumes: [`application/json`],
      produces: [`application/json`]
    }

    const outputFile = `./swagger-output.json`;
    const routes = [`./main.js`];

    await swaggerAutogen(outputFile, routes, doc);
    require(`./main.js`)


  } catch (erro) {
    console.error(`Erro no arquivo swagger.js
    ${erro.name}: ${erro.message}`);
  }
}

runSwaggerAndStart();