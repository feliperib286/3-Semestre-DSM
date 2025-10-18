import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// A porta foi definida como 3001, mas o front-end está buscando em :3000.
// Verifique se o front-end e o back-end estão na mesma porta ou se está usando um proxy.
// Vou usar 3001, que é o que está no seu código.
const PORT = process.env.PORT || 3001; 

// Serve os arquivos estáticos (CSS, JS, imagens) da pasta 'views'
app.use(express.static(path.join(__dirname, '..', 'views'))); 

// Rota principal para servir o arquivo HTML
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// Rota da API para buscar dados do clima
app.get('/clima', async (req: Request, res: Response) => {
    
    const city = req.query.cidade as string;
    const apiKey = process.env.API_KEY;

    // Validação de entrada
    if (!city) {
        return res.status(400).json({ error: 'O nome da cidade é obrigatório.' });
    }

    // Verificação da Chave de API (configuração do servidor)
    if (!apiKey) {
        // Log de erro no console do servidor para o desenvolvedor
        console.error("ERRO CRÍTICO: Variável API_KEY não configurada no arquivo .env");
        return res.status(500).json({ error: 'Erro interno: A chave da API não foi configurada.' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Formata os dados recebidos da API para o objeto que o front-end espera
        const weatherData = {
            nome: data.name,
            pais: data.sys.country,
            temperatura: data.main.temp,
            sensacaoTermica: data.main.feels_like,
            umidade: data.main.humidity,
            condicao: data.weather[0].description,
            icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        };

        res.json(weatherData);

    } catch (error) {
        // Tratamento de Erro Aprimorado (Corrige o problema do erro 500 genérico)
        if (axios.isAxiosError(error) && error.response) {
            const statusCode = error.response.status;

            if (statusCode === 404) {
                // Erro 404 da API Externa -> Retorna 404 para o front-end
                return res.status(404).json({ error: 'Cidade não encontrada.' });
            } 
            
            if (statusCode === 401 || statusCode === 403) {
                // Erro 401/403 da API Externa (Chave Inválida/Acesso Negado)
                console.error("ERRO DE API KEY: A chave da API é inválida ou expirou.");
                return res.status(500).json({ error: 'Erro de configuração: Chave da API inválida.' });
            }

            // Outros erros HTTP da API Externa (ex: 429 Too Many Requests)
            return res.status(500).json({ error: `Erro ao buscar dados do clima (${statusCode}).` });
        }
        
        // Erros de rede ou outros erros internos do servidor
        console.error("Erro interno inesperado:", error);
        return res.status(500).json({ error: 'Erro interno inesperado do servidor.' });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});