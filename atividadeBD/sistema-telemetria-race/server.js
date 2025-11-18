const express = require('express');
const mongoose = require('mongoose');
const leituraRoutes = require('./routes/leituras');
const backupScheduler = require('./utils/backupScheduler');
const importarTemperaturaAmbiente = require('./utils/climaImporter'); // ⬅️ FALTOU AQUI TAMBÉM

const app = express();
const PORT = 3000;
const DB_URI = 'mongodb://localhost:27017/telemetria_race'; 

// Conexão com o MongoDB
mongoose.connect(DB_URI)
    .then(() => {
        console.log('✅ Conectado ao MongoDB!');
        
        // 🚨 CORREÇÃO: Chamar a Q. 8 aqui para que ela execute automaticamente
        importarTemperaturaAmbiente(); 
    })
    .catch(err => console.error('❌ Erro de conexão:', err));

// Rota de Teste para Q. 8 (Pode manter, mas não é a solução do problema)
app.get('/importar-clima', async (req, res) => {
    try {
        await importarTemperaturaAmbiente();
        res.status(200).send("Importação de clima iniciada e concluída. Verifique o console/DB.");
    } catch (e) {
        res.status(500).send("Erro na importação de clima.");
    }
}); 
// Middlewares (Mantenha antes das rotas, mas depois das chamadas de API)
app.use(express.json()); // Habilita o Express a processar JSON

// Rotas
app.use(leituraRoutes); // Usa a rota POST /leituras (Q. 7)


// Automação (Q. 10)
backupScheduler.start();

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor Node.js rodando na porta ${PORT}`);
});