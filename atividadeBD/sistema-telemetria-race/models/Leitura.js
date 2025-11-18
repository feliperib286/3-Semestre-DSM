// models/Leitura.js
const mongoose = require('mongoose');

const LeituraSchema = new mongoose.Schema({
  carro: { type: String, required: true },    // Obrigatório para validação da Q. 7
  sensor: { type: String, required: true },   // Obrigatório
  valor: { type: Number, required: true },    // Obrigatório
  data_hora: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Leitura', LeituraSchema);
