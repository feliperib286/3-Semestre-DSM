const API_URL = "http://localhost:3000/lista";

// Carregar clientes ao abrir a página
document.addEventListener("DOMContentLoaded", carregarLista);

const form = document.getElementById("lista-form");
form.addEventListener("submit", salvarlista);

// Buscar e exibir Produtos
async function carregarLista() {
  const resposta = await fetch(API_URL);
  const produtos = await resposta.json();

  const lista = document.getElementById("clientes-lista");
  lista.innerHTML= "";

  produtos.forEach((listas) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td>${listas.produto}</td>
            <td>${listas.valor}</td>
            <td>${listas.quantidade}</td>
            <td>
        <button class="acao-btn editar-btn" onclick="editarLista('${listas._id}', '${listas.produto}', '${listas.valor}', '${listas.quantidade}')">Editar</button>
        <button class="acao-btn excluir-btn" onclick="excluirCliente('${listas._id}')">Excluir</button>
      </td>
        `;

    lista.appendChild(tr);
  });
}

// Salvar cliente (novo ou atualização)
async function salvarlista(e) {
  e.preventDefault();

  const id = document.getElementById("lista-id").value;
  const produto = document.getElementById("produto").value;
  const quantidade = document.getElementById("quantidade").value;
  const valor = document.getElementById("valor").value;

  const cliente = { produto, valor, quantidade};

  if (id) {
    // Alterar (PUT)
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
  } else {
    // Criar (POST)
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
  }

  form.reset();
  carregarLista();
}

// Preencher formulário para editar lista
function editarLista(id, produto, valor, quantidade) {
  document.getElementById("lista-id").value = id;
  document.getElementById("produto").value = produto;
  document.getElementById("valor").value = valor;
  document.getElementById("quantidade").value = quantidade;
}

// Excluir cliente
async function excluirCliente(id) {
  if (confirm("Deseja realmente exlcuir este cliente?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarLista();
  }
}

