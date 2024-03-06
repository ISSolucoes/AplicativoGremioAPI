const mongoose = require(`mongoose`);

const { AlunoSchema } = require(`./Aluno`);
const { ChapaSchema } = require(`./Chapa`);

const EscolaSchema = new mongoose.Schema({
  nomeEscola: String,
  email: String,
  senha: String,
  alunos: [AlunoSchema],
  chapas: [ChapaSchema],
  token: String
});
const collectionEscola = `escolas`;
const EscolaModel = mongoose.model(`Escola`, EscolaSchema, collectionEscola);

module.exports = {
  EscolaModel,
  EscolaSchema
};