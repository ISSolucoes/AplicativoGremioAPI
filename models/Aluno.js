const mongoose = require(`mongoose`);
const AlunoSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  matricula: String,
  serie: String,
  turno: String,
  area: String
});
const collectionAluno = `alunos`;
const AlunoModel = mongoose.model(`Aluno`, AlunoSchema, collectionAluno);

module.exports = {
  AlunoModel,
  AlunoSchema
};