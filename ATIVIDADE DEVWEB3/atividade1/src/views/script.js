const API_URL = "http://localhost:3000";

// Função utilitária para criar botões de atualizar/excluir (pessoas e carros)
function createActions(id, type) {
  const div = document.createElement("div");
  div.className = "actions";

  // Botão atualizar
  const btnUpdate = document.createElement("button");
  btnUpdate.textContent = "✏️";
  btnUpdate.onclick = async () => {
    const novoValor = prompt("Novo valor:");
    if (!novoValor) return;

    await fetch(`${API_URL}/${type}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        type === "carros" ? { modelo: novoValor } : { nome: novoValor }
      )
    });
    carregarDados();
  };

  // Botão excluir
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "🗑️";
  btnDelete.onclick = async () => {
    await fetch(`${API_URL}/${type}/${id}`, { method: "DELETE" });
    carregarDados();
  };

  div.appendChild(btnUpdate);
  div.appendChild(btnDelete);
  return div;
}

// ====== Carros ======
document.getElementById("formCarro").addEventListener("submit", async e => {
  e.preventDefault();
  const modelo = document.getElementById("carroModelo").value;

  await fetch(`${API_URL}/carros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modelo })
  });

  e.target.reset();
  carregarDados();
});

// ====== Pessoas ======
document.getElementById("formPessoa").addEventListener("submit", async e => {
  e.preventDefault();
  const nome = document.getElementById("pessoaNome").value;

  await fetch(`${API_URL}/pessoas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome })
  });

  e.target.reset();
  carregarDados();
});

// ====== Associações ======
document.getElementById("formAssociacao").addEventListener("submit", async e => {
  e.preventDefault();
  const pessoaId = document.getElementById("assocPessoaId").value;
  const carroId = document.getElementById("assocCarroId").value;

  await fetch(`${API_URL}/associacoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pessoaId: Number(pessoaId), carroId: Number(carroId) })
  });

  e.target.reset();
  carregarDados();
});

// ====== Listar tudo ======
async function carregarDados() {
  // Carros
  const carros = await fetch(`${API_URL}/carros`).then(r => r.json());
  const listaCarros = document.getElementById("listaCarros");
  listaCarros.innerHTML = "";
  carros.forEach(c => {
    const carroId = c.id || c.carroId; // aceita id ou carroId
    const li = document.createElement("li");
    li.textContent = `${carroId} - ${c.modelo}`;
    li.appendChild(createActions(carroId, "carros"));
    listaCarros.appendChild(li);
  });

  // Pessoas
  const pessoas = await fetch(`${API_URL}/pessoas`).then(r => r.json());
  const listaPessoas = document.getElementById("listaPessoas");
  listaPessoas.innerHTML = "";
  pessoas.forEach(p => {
    const pessoaId = p.id || p.pessoaId; // aceita id ou pessoaId
    const li = document.createElement("li");
    li.textContent = `${pessoaId} - ${p.nome}`;
    li.appendChild(createActions(pessoaId, "pessoas"));
    listaPessoas.appendChild(li);
  });

  // Associações
  const associacoes = await fetch(`${API_URL}/associacoes`).then(r => r.json());
  const listaAssociacoes = document.getElementById("listaAssociacoes");
  listaAssociacoes.innerHTML = "";
  associacoes.forEach(a => {
    const assocId = a.id; // id da associação
    const pessoaId = a.pessoaId || a.idPessoa;
    const carroId = a.carroId || a.idCarro;

    const li = document.createElement("li");
    li.textContent = `Associação ${assocId}: Pessoa ${pessoaId} ↔ Carro ${carroId}`;

    // Botão excluir associação
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "🗑️";
    btnDelete.onclick = async () => {
      await fetch(`${API_URL}/associacoes/${assocId}`, { method: "DELETE" });
      carregarDados();
    };

    li.appendChild(btnDelete);
    listaAssociacoes.appendChild(li);
  });
}

carregarDados();
