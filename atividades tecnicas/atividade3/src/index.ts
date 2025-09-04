// Classe ContaBancaria
class ContaBancaria {
  private saldo: number;

  constructor() {
    this.saldo = 0;
  }

  depositar(valor: number): void {
    if (valor > 0) {
      this.saldo += valor;
      console.log(`Depósito de R$ ${valor.toFixed(2)} realizado. Saldo atual: R$ ${this.saldo.toFixed(2)}`);
    } else {
      console.log("Valor de depósito inválido.");
    }
  }

  sacar(valor: number): void {
    if (valor > 0 && valor <= this.saldo) {
      this.saldo -= valor;
      console.log(`Saque de R$ ${valor.toFixed(2)} realizado. Saldo atual: R$ ${this.saldo.toFixed(2)}`);
    } else {
      console.log(`Saque de R$ ${valor.toFixed(2)} não permitido. Saldo atual: R$ ${this.saldo.toFixed(2)}`);
    }
  }
}

// Classe Cliente
class Cliente {
  private nome: string;
  private cpf: string;
  private nasc: Date;
  private nomemae: string;
  public conta: ContaBancaria;

  constructor(nome: string, cpf: string, nasc: Date, nomemae: string, conta: ContaBancaria) {
    this.nome = nome;
    this.cpf = cpf;
    this.nasc = nasc;
    this.nomemae = nomemae;
    this.conta = conta;
  }
}

// --------------------------
// Demonstração da execução
// --------------------------

// Criar uma conta bancária
const conta = new ContaBancaria();

// Criar cliente com dados
const cliente = new Cliente(
  "Seu Nome",
  "123.456.789-00",
  new Date("1995-09-04"), // YYYY-MM-DD
  "Maria",
  conta
);

// Operações solicitadas
console.log("\n--- Operações Bancárias ---\n");

cliente.conta.depositar(100); // depósito de R$100
cliente.conta.sacar(50);      // saque de R$50
cliente.conta.sacar(60);      // tentativa de saque de R$60
