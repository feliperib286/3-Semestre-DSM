import express, { Express } from "express";
import mongoose from "mongoose";    
import path from "path";  
import clientRoutes from "./route/clientRoutes"; // Importando as rotas de cliente
const app: Express = express();
//Middleware para analisar o corpo das requisições
app.use(express.json());
// Conexão com o MongoDB  
mongoose.connect("mongodb://127.0.1:27017/cadastroDB")
 .then(() => console.log("Conectado ao MongoDB Compass com sucesso!"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB Compass:", error));

  //Rota Api
app.use("/api", clientRoutes); // Usando as rotas de cliente
//servir frontend da pasta public
app.use(express.static(path.join(__dirname, "../public")));

//inicar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");   
});