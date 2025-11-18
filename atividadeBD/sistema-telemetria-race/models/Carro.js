// models/Carro.js
const mongoose = require('mongoose');

// Sub-Schema para o array de manutenções (Embedding)
const ManutencaoSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  tipo: { type: String, required: true },
  mecanico: { type: String, required: true },
  pecas_trocadas: [String]
});

const CarroSchema = new mongoose.Schema({
  modelo: { type: String, required: true, unique: true },
  piloto: String,
  // Q. 1: Embedding
  manutencoes: [ManutencaoSchema] 
});

module.exports = mongoose.model('Carro', CarroSchema);