const express = require('express');
const router = express.Router();
const Leitura = require('../models/Leitura');

router.post('/leituras', async (req, res) => {
  try {
    const novaLeitura = new Leitura(req.body); 
    
    // 1. A validação ocorre implicitamente quando .save() é chamado.
    const leituraSalva = await novaLeitura.save(); // 2. Insere a leitura

    // 3. Retorna código HTTP 201 (Created)
    res.status(201).json(leituraSalva); 

  } catch (error) {
    if (error.name === 'ValidationError') {
      // Se a validação do Mongoose falhar (campo obrigatório faltando)
      return res.status(400).json({ erro: "Dados de leitura incompletos ou inválidos." }); 
    }
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
});
module.exports = router;