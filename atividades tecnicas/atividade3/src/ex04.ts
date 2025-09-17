

// --- Exercício 4: Agenda de Contatos ---
// Classe Contato
class Contato {
  constructor(public nome: string, public telefone: string, public email: string) {}
}

// Classe Agenda
class Agenda {
  private contatos: Contato[] = [];

  adicionarContato(contato: Contato): void {
    this.contatos.push(contato);
  }

  removerContato(contato: Contato): void {
    const index = this.contatos.findIndex(c => c.nome === contato.nome && c.telefone === contato.telefone && c.email === contato.email);
    if (index > -1) {
      this.contatos.splice(index, 1);
    }
  }
}

console.log("\n--- Execução do Exercício 4 ---\n");
const minhaAgenda = new Agenda();
const contato1 = new Contato("João", "11987654321", "joao@email.com");
const contato2 = new Contato("Maria", "11912345678", "maria@email.com");

minhaAgenda.adicionarContato(contato1);
minhaAgenda.adicionarContato(contato2);

console.log(minhaAgenda);
minhaAgenda.removerContato(contato1);
console.log(minhaAgenda);

// --- Fim do Exercício 4 ---

