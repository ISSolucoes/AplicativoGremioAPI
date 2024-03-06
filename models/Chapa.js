const mongoose = require(`mongoose`);

const { AlunoSchema } = require(`./Aluno`);

const ChapaSchema = new mongoose.Schema({
  nomeChapa: String,
  alunos: [AlunoSchema]
});
const collectionChapa = `chapas`;
const ChapaModel = mongoose.model(`Chapa`, ChapaSchema, collectionChapa);

module.exports = {
  ChapaModel,
  ChapaSchema
};