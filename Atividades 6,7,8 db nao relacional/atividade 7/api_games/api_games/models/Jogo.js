const mongoose = require("mongoose");

const jogoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true },
  preco: { type: Number, required: true },
  estoque: { type: Number, required: true }
});

module.exports = mongoose.model("Jogo", jogoSchema);
