// utils/climaImporter.js
const axios = require('axios');
const Clima = require('../models/Clima'); 

const API_KEY = '74d094efa0905fe8563410f94c81d3ba'; // << SUBSTITUIR
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const CITY = 'Jacareí,br'; 

async function importarTemperaturaAmbiente() {
  try {
    // 1. Consome a API externa usando os parâmetros
    const response = await axios.get(API_URL, {
        params: {
            q: CITY,
            appid: API_KEY,
            units: 'metric' // Para extrair em Celsius
        }
    }); 

    // 2. Extrai a temperatura (temp) e descrição
    const temperatura = response.data.main.temp; 
    const descricao = response.data.weather[0].description;
    
    // 3. Salva na coleção 'clima'
    const novoClima = new Clima({
      temperatura: temperatura,
      descricao: descricao
    });
    await novoClima.save();
    console.log(`✅ Temperatura salva: ${temperatura}°C.`);

  } catch (error) {
    console.error("❌ Erro ao importar clima. Verifique a chave e a conexão.");
  }
}
module.exports = importarTemperaturaAmbiente;