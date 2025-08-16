const API_URL = "/tasks";
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// 📌 Carregar tarefas ao iniciar
async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${task.title}</strong> - ${task.description}
      </div>
      <div class="actions">
        <button onclick="editTask(${task.id})">✏️ Editar</button>
        <button onclick="deleteTask(${task.id})">🗑 Excluir</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// 📌 Criar nova tarefa
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  });

  taskForm.reset();
  loadTasks();
});

// 📌 Excluir tarefa
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTasks();
}

// 📌 Editar tarefa
async function editTask(id) {
  const newTitle = prompt("Novo título:");
  const newDescription = prompt("Nova descrição:");

  if (newTitle && newDescription) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, description: newDescription })
    });
    loadTasks();
  }
}

// Inicializa
loadTasks();
