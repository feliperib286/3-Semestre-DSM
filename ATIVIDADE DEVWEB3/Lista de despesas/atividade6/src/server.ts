import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import expenseRoutes from './routes/expenseRoutes';

const app = express();
const PORT = 3000;
// Altere para o nome do seu banco de dados
const MONGODB_URI = 'mongodb://localhost:27017/controle_despesas_db';

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// Servir arquivos estáticos do frontend (index.html, script.js, styles.css) 
app.use(express.static('views'));

// Conectar ao MongoDB 
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB conectado ao DB: controle_despesas_db'))
    .catch(err => console.log('Erro ao conectar ao MongoDB', err));

// Usar as rotas de despesas, prefixando com '/api/expenses'
app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});