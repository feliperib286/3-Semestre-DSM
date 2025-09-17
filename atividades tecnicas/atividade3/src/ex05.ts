

// --- Exercício 5: Autenticação de Usuário ---
// Classe AutenticacaoDeUsuario
class AutenticacaoDeUsuario {
  private usuarios: Map<string, string> = new Map();

  registrarUsuario(usuario: string, senha: string): void {
    this.usuarios.set(usuario, senha);
    console.log(`Usuário ${usuario} registrado com sucesso.`);
  }

  autenticarUsuario(usuario: string, senha: string): boolean {
    if (this.usuarios.has(usuario) && this.usuarios.get(usuario) === senha) {
      return true;
    }
    return false;
  }
}

console.log("\n--- Execução do Exercício 5 ---\n");
const autenticacao = new AutenticacaoDeUsuario();
autenticacao.registrarUsuario("alice", "senha123");
autenticacao.registrarUsuario("bob", "outrasenha");

const usuarioAutenticado = autenticacao.autenticarUsuario("alice", "senha123");

if (usuarioAutenticado) {
  console.log("Usuário autenticado com sucesso!");
} else {
  console.log("Falha na autenticação do Usuário!");
}

const usuarioFalhou = autenticacao.autenticarUsuario("bob", "senhaerrada");

if (usuarioFalhou) {
  console.log("Usuário autenticado com sucesso!");
} else {
  console.log("Falha na autenticação do Usuário!");
}

// --- Fim do Exercício 5 ---