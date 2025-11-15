import express from "express";
import dotenv from "dotenv";
import connect from "./models/connection.js"; // Importa a função de conexão
import routes from './routes/index.js'; // Importa o arquivo de rotas principal

dotenv.config(); // Carrega as variáveis de ambiente do .env

// Usa a porta definida no .env (PORT=3001) ou 3000 como padrão
const PORT = process.env.PORT || 3000;
const app = express(); // Cria o servidor Express

// Suporta parâmetros JSON no body da requisição
app.use(express.json());

// Conecta ao MongoDB no início da aplicação
connect();

// Define as rotas para o pacote /routes
app.use(routes);

// Inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});