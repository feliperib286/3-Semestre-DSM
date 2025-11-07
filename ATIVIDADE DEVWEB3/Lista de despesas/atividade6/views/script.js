const API_URL = 'http://localhost:3000/api/expenses';
const expenseForm = document.getElementById('expenseForm');
const btnSubmit = document.getElementById('btnSubmit');
const btnCancelEdit = document.getElementById('btnCancelEdit');

// ---------------------- FUNÇÕES CORE ----------------------

// Função para buscar e listar todas as despesas 
async function fetchExpenses() {
    try {
        const response = await fetch(API_URL);
        const expenses = await response.json();
        const expensesListDiv = document.getElementById('expensesList');
        expensesListDiv.innerHTML = '';

        expenses.forEach(expense => {
            const date = new Date(expense.date);
            // Formatação da data para dd/mm/aaaa 
            const formattedDate = date.toLocaleDateString('pt-BR');

            const div = document.createElement('div');
            div.className = 'expense-item';
            div.innerHTML = `
            <span class="cell-description">${expense.description}</span>
            <span class="cell-amount">R$${expense.amount.toFixed(2)}</span>
            <span class="cell-date">${formattedDate}</span>
            <div class="actions">
                <button class="btn-alterar" onclick="loadExpenseForEdit('${expense._id}')">Alterar</button>
                <button class="btn-excluir" onclick="deleteExpense('${expense._id}')">Excluir</button>
            </div>
        `;
            expensesListDiv.appendChild(div);
        });

    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
    }
}

// Função para buscar e exibir o total das despesas 
async function fetchTotalExpenses() {
    try {
        // Chama a rota específica do somatório 
        const response = await fetch(`${API_URL}/total`);
        if (!response.ok) throw new Error('Falha ao buscar total');

        const data = await response.json();
        const totalAmount = data.totalAmount || 0;

        // Exibir o total formatado
        document.getElementById('totalExpenses').innerText = `Total das Despesas: R$${totalAmount.toFixed(2)}`;
    } catch (error) {
        console.error('Erro ao buscar o total das despesas:', error);
    }
}

// Função para salvar (POST) ou atualizar (PUT) despesa 
async function saveOrUpdateExpense(event) {
    event.preventDefault();

    const id = document.getElementById('expenseId').value;
    const dateInput = document.getElementById('date').value;

    // Validação do lado do cliente (Requisito Extra)
    if (!document.getElementById('description').value || !document.getElementById('amount').value || !dateInput) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Converte a data no formato YYYY-MM-DD para o formato ISO Date (necessário para MongoDB)
    const expenseData = {
        description: document.getElementById('description').value,
        amount: parseFloat(document.getElementById('amount').value),
        // Usamos o formato YYYY-MM-DD para criar o objeto Date corretamente
        date: dateInput ? new Date(dateInput + 'T00:00:00').toISOString() : new Date().toISOString(),
    };

    let method = 'POST';
    let url = API_URL;

    if (id) {
        method = 'PUT'; // Modo de edição
        url = `${API_URL}/${id}`;
    }

    const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
    });

    if (response.ok) {
        clearForm();
        await fetchExpenses(); // Atualiza a lista
        fetchTotalExpenses(); // Recalcula o total 
    } else {
        const errorData = await response.json();
        alert('Erro ao salvar despesa: ' + (errorData.details || 'Verifique o console para mais detalhes.'));
    }
}

// Função para pré-carregar despesa para edição 
async function loadExpenseForEdit(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const expense = await response.json();

        document.getElementById('expenseId').value = expense._id;
        document.getElementById('description').value = expense.description;
        document.getElementById('amount').value = expense.amount.toFixed(2);

        // Formata a data ISO (AAAA-MM-DDTHH:MM:SS...) para AAAA-MM-DD (necessário para input type="date")
        const dateOnly = new Date(expense.date).toISOString().split('T')[0];
        document.getElementById('date').value = dateOnly;

        btnSubmit.textContent = 'Salvar Alterações';
        btnCancelEdit.style.display = 'inline-block';
    } catch (error) {
        console.error('Erro ao carregar despesa para edição:', error);
        alert('Erro ao carregar despesa.');
    }
}

// Função para deletar despesa 
async function deleteExpense(id) {
    if (!confirm('Tem certeza que deseja EXCLUIR esta despesa?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            await fetchExpenses(); // Atualiza a lista
            fetchTotalExpenses(); // Recalcula o total 
        } else {
            alert('Erro ao excluir despesa.');
        }
    } catch (error) {
        console.error('Erro ao deletar despesa:', error);
    }
}

// Função para limpar o formulário e reverter para o modo de cadastro
function clearForm() {
    expenseForm.reset();
    document.getElementById('expenseId').value = '';
    btnSubmit.textContent = 'Cadastrar Despesa';
    btnCancelEdit.style.display = 'none';
}


// ---------------------- EVENTOS ----------------------

// Disparar funções ao enviar o formulário
expenseForm.addEventListener('submit', saveOrUpdateExpense);

// Disparar função para cancelar edição
btnCancelEdit.addEventListener('click', clearForm);

// Carregar despesas e total ao iniciar a página 
window.addEventListener('DOMContentLoaded', () => {
    fetchExpenses();
    fetchTotalExpenses();
});