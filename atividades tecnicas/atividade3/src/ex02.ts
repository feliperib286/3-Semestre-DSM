

// --- Exercício 2: Carrinho de Compras ---
// Classe CarrinhoDeCompras
class CarrinhoDeCompras {
  private itens: string[] = [];

  adicionarItem(item: string): void {
    this.itens.push(item);
  }

  removerItem(item: string): void {
    const index = this.itens.indexOf(item);
    if (index > -1) {
      this.itens.splice(index, 1);
    }
  }

  imprimir(): void {
    console.log("Itens no carrinho:");
    this.itens.forEach(item => console.log(`- ${item}`));
  }
}

console.log("\n--- Execução do Exercício 2 ---\n");
const carrinho = new CarrinhoDeCompras();
carrinho.adicionarItem("Camiseta");
carrinho.adicionarItem("Calça");
carrinho.adicionarItem("Meia");
carrinho.removerItem("Camiseta");
carrinho.imprimir();

