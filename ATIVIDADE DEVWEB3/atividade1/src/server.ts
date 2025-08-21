import express from 'express';
import path from 'path';
import carroRoutes from './routes/carroRoutes';
import pessoaRoutes from './routes/pessoaRoutes';
import pessoaPorCarroRoutes from './routes/pessoaPorCarroRoutes';

const app = express();
app.use(express.json());

// 👉 Configurar a pasta de views como pública
app.use(express.static(path.join(__dirname, 'views')));

// Rotas da API
app.use('/carros', carroRoutes);
app.use('/pessoas', pessoaRoutes);
app.use('/associacoes', pessoaPorCarroRoutes);

// 👉 Rota padrão para carregar o index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
