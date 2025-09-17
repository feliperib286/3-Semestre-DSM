
// Classe Item
class Item {
  public descricao: string;
  public valor: number;
  public quantidade: number;

  constructor(descricao: string, valor: number, quantidade: number) {
    this.descricao = descricao;
    this.valor = valor;
    this.quantidade = quantidade;
  }
}

// Classe Carrinho
class Carrinho {
  public itens: Item[] = [];

  adicionarItem(item: Item): void {
    this.itens.push(item);
  }

  removerItem(item: Item): void {
    const index = this.itens.indexOf(item);
    if (index > -1) {
      this.itens.splice(index, 1);
    }
  }

  calcularTotal(): number {
    let total = 0;
    this.itens.forEach(item => {
      total += item.valor * item.quantidade;
    });
    return total;
  }
}

// Classe Pagamento
class Pagamento {
  processarPagamento(total: number, forma: string): void {
    console.log(`Pagamento de R$${total} em ${forma}, processado com sucesso!`);
  }
}

console.log("\n--- Execução do Exercício 3 ---\n");
const carrinhoc = new Carrinho();
let item = new Item("Camiseta", 50, 2);
carrinhoc.adicionarItem(item);
item = new Item("Calça", 130, 1);
carrinhoc.adicionarItem(item);
item = new Item("Meia", 20, 3);
carrinhoc.adicionarItem(item);

const total = carrinhoc.calcularTotal();
console.log(total);

const pagamento = new Pagamento();
pagamento.processarPagamento(total, "dinheiro");

