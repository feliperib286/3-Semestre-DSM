// models/Clima.js
const mongoose = require('mongoose');

const ClimaSchema = new mongoose.Schema({
  temperatura: { type: Number, required: true },
  descricao: String,
  data_importacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Clima', ClimaSchema, 'clima'); // Nome da coleção: 'clima'