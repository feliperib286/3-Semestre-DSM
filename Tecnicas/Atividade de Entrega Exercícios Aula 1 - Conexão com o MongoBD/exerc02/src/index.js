import express from "express";
import dotenv from "dotenv";
import connect from "./models/connection.js";
import routes from './routes/index.js';
dotenv.config(); // Carrega as variáveis de ambiente do .env [cite: 382]
// Usa a porta definida no .env ou 3000 como padrão [cite: 384]
const PORT = process.env.PORT || 3000;
const app = express(); // Cria o servidor Express [cite: 385]
// Suporta parâmetros JSON no body da requisição [cite: 386]
app.use(express.json());
// Conecta ao MongoDB no início da aplicação [cite: 387]
connect();
// Define as rotas para o pacote /routes [cite: 391]
app.use(routes);
// Inicializa o servidor na porta especificada [cite: 388]
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`); // [cite: 390]
});
//# sourceMappingURL=index.js.map