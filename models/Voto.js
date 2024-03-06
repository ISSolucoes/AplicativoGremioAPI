const mongoose = require(`mongoose`);

const { ChapaSchema } = require(`./Chapa`);

const VotoSchema = new mongoose.Schema({
  chapa: ChapaSchema,
  quantidadeDeVotos: Number
});
const collectionVoto = `Votos`;
const VotoModel = mongoose.model(`Voto`, VotoSchema, collectionVoto);

module.exports = {
  VotoModel,
  VotoSchema
};