const express = require("express");
const router = express.Router();
const Jogo = require("../models/Jogo");

// Listar todos os jogos
router.get("/", async (req, res) => {
  try {
    const jogos = await Jogo.find();
    res.json(jogos);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar jogos" });
  }
});

// Criar novo jogo
router.post("/", async (req, res) => {
  try {
    const novoJogo = new Jogo(req.body);
    await novoJogo.save();
    res.status(201).json(novoJogo);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao criar jogo" });
  }
});

// Atualizar jogo por ID
router.put("/:id", async (req, res) => {
  try {
    const jogoAtualizado = await Jogo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(jogoAtualizado);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar jogo" });
  }
});

// Deletar jogo por ID
router.delete("/:id", async (req, res) => {
  try {
    await Jogo.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Jogo removido com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao excluir jogo" });
  }
});

module.exports = router;
