const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = cityInput.value;
    weatherResult.innerHTML = '';
    errorMessage.textContent = '';

    // Validação para evitar buscas vazias
    if (!city){
        errorMessage.textContent = 'Por favor, digite o nome de uma cidade.';
        return;
    }

    try {
        // ATENÇÃO: Se o seu backend estiver na porta 3001, o front-end precisa saber disso.
        // O código original (fetch('/clima...')) assume que o front-end e o back-end estão na mesma porta ou que há um proxy.
        // Se estiverem em portas diferentes, use: const response = await fetch(`http://localhost:3001/clima?cidade=${encodeURIComponent(city)}`);
        
        const response = await fetch (`/clima?cidade=${encodeURIComponent(city)}`);
        const data = await response.json()

        // Tratamento de Erros: Cidade não encontrada ou erro do servidor
        if (response.status !== 200){
            errorMessage.textContent = data.error;
        } else {
            displayWeather(data);
        }
    } catch (error){
        // Tratamento de Erros: Problema de conexão (servidor fora do ar)
        errorMessage.textContent = 'Não foi possivel conectar ao servidor. Tente novamente mais tarde ';
    }
});

// Função para exibir os dados do clima
function displayWeather(data) {
    const { nome, pais, temperatura, sensacaoTermica, umidade, condicao, icone } = data;

    // Exibição formatada das informações
    const weatherContent = `
        <div class="weather-info">
            <h2>${nome}, ${pais} <img src="${icone}" alt="Ícone do tempo"></h2>
            <p><strong>Temperatura:</strong> ${temperatura.toFixed(1)}°C</p>
            <p><strong>Sensação Térmica:</strong> ${sensacaoTermica.toFixed(1)}°C</p>
            <p><strong>Umidade:</strong> ${umidade}%</p>
            <p><strong>Condição:</strong> ${condicao}</p>
        </div>
    `;
    weatherResult.innerHTML = weatherContent;
}