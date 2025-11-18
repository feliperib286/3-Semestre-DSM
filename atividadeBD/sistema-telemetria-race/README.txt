npm init -y
npm install express mongoose axios node-cron



Questão 1: Modelagem (Embedding vs. Referencing)
Proposta: Embedding (Incorporação).

Justificativa: Prioriza a análise rápida durante a corrida. Incorporar o array de manutenções dentro do documento do carro permite que a aplicação recupere o carro e todo seu histórico em uma única consulta (minimizando joins), otimizando o desempenho de leitura (read performance). O volume de dados de cada manutenção é pequeno o suficiente para o limite de 16MB do documento MongoDB.

JSON

// Estrutura na Coleção 'carros' (Exemplo de Embedding)
{
  "_id": "CAR001",
  "modelo": "GT-R",
  "piloto": "Ayrton Senna",
  "manutencoes": [ 
    {
      "data": ISODate("2025-10-20T10:00:00Z"),
      "tipo": "Troca de óleo",
      "mecanico": "João Silva",
      "pecas_trocadas": ["Óleo Motul"]
    }
  ]
}
2. Questão 2: Inserção de Dados
Comando MongoDB Shell:

JavaScript

use telemetria_race;
db.leituras.insertMany([
  { "carro": "GT-R", "sensor": "temperatura_motor", "valor": 95.2, "data_hora": new Date() },
  { "carro": "F40", "sensor": "pressao_oleo", "valor": 7.5, "data_hora": new Date() },
  { "carro": "GT-R", "sensor": "velocidade", "valor": 280.5, "data_hora": new Date() }
]);
3. Questão 3: Consultas com Operadores Lógicos
Critério: Sensor seja ("temperatura_motor" OU "pressao_oleo") E valor maior que 90.

Comando MongoDB Shell:

JavaScript

db.leituras.find({
  $or: [
    { "sensor": "temperatura_motor" },
    { "sensor": "pressao_oleo" }
  ],
  "valor": { $gt: 90 }
});
4. Questão 4: Atualização Avançada
Ação: Atualizar leituras do "GT-R". Adicionar "status_sensor": "verificar" E remover codigo_defeito.

Comando MongoDB Shell:

JavaScript

db.leituras.updateMany(
  { "carro": "GT-R" },
  {
    $set: { "status_sensor": "verificar" }, 
    $unset: { "codigo_defeito": "" }
  }
);
5. Questão 5: Paginação
Ação: Listar as 5 leituras mais recentes do sensor "velocidade", ignorando as primeiras 10.

Comando MongoDB Shell:

JavaScript

db.leituras.find({
  "sensor": "velocidade"
})
.sort({ "data_hora": -1 }) 
.skip(10)                  
.limit(5);                 
6. Questão 6: Agregação
Ação: Calcular a média de temperatura do motor por carro, ordenando os maiores valores primeiro.

Comando MongoDB Shell:

JavaScript

db.leituras.aggregate([
  { $match: { "sensor": "temperatura_motor" } },
  {
    $group: {
      "_id": "$carro",
      "media_temperatura": { $avg: "$valor" }
    }
  },
  { $sort: { "media_temperatura": -1 } }
]);
II. 💻 API, Integração e Segurança (Node.js/Shell)
7. Questão 7: API Node.js (Rota POST /leituras)
Ação: Rota que valida (via Mongoose required), insere e retorna HTTP 201.

Código-chave (routes/leituras.js):

JavaScript

// routes/leituras.js
// ... imports ...
router.post('/leituras', async (req, res) => {
  try {
    const novaLeitura = new Leitura(req.body); 
    const leituraSalva = await novaLeitura.save(); 
    res.status(201).json(leituraSalva); // Retorna HTTP 201
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ erro: "Dados incompletos." });
    }
  }
});
// ...
8. Questão 8: Consumo de API Externa (Clima)
Ação: Função Node.js que consome a API OpenWeatherMap, extrai a temperatura e salva na coleção clima.

Código-chave (utils/climaImporter.js):

JavaScript

// utils/climaImporter.js
const axios = require('axios');
const Clima = require('../models/Clima'); 
const API_KEY = '74d094efa0905fe8563410f94c81d3ba'; // Sua chave
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function importarTemperaturaAmbiente() {
  const response = await axios.get(API_URL, { 
      params: { appid: API_KEY, units: 'metric', q: 'Jacareí,br' } 
  }); 

  const temperatura = response.data.main.temp; // Extrai temp
  const novoClima = new Clima({ temperatura: temperatura });
  await novoClima.save(); // Salva no DB
}

// Deve ser chamada no server.js: mongoose.connect().then(() => importarTemperaturaAmbiente())
9. Questão 9: Segurança no MongoDB
Ação: Criar o usuário engenheiroCorrida com acesso apenas de leitura (read) no banco telemetria_race.

Comando MongoDB Shell (Executado no banco admin):

JavaScript

use admin 
db.createUser({
  user: "engenheiroCorrida",
  pwd: "SENHA_SEGURA",
  roles: [
    { role: "read", db: "telemetria_race" } 
  ]
});
10. Questão 10: Backup e Automação
Ação: Criar o comando de backup e o script de automação diária com node-cron.

1. Comando de Backup (Shell/CMD):

Bash

mongodump --db="telemetria_race" --out="/caminho/para/backups/diarios/telemetria_$(date +%Y%m%d)"
(No PowerShell, substitua $(date +%Y%m%d) por $(Get-Date -Format yyyyMMdd) e use o caminho completo do mongodump.exe.)

2. Script de Automação (utils/backupScheduler.js):

JavaScript

// utils/backupScheduler.js
const cron = require('node-cron');
const { exec } = require('child_process');

// Comando mongodump (ajustado para Windows ou Linux)
const BACKUP_COMMAND = 'mongodump ...'; 

function startBackupScheduler() {
    // Agenda a execução para 01:00 AM
    cron.schedule('0 1 * * *', () => { 
        exec(BACKUP_COMMAND, (error) => {
             // ... lógica de execução do mongodump ...
        });
    });
}
module.exports = { start: startBackupScheduler };