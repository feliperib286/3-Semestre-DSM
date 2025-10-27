const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// Conexão com o MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/api_games")
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

// Importa as rotas
const jogosRoutes = require("./routes/jogos");
app.use("/jogos", jogosRoutes);

// Inicializa o servidor
app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000"));
