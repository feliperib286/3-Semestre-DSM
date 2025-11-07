import mongoose, { Schema, Document } from "mongoose";

// Interface TypeScript para o documento do MongoDB (Despesa)
export interface IExpense extends Document {
    description: string; // descrição da despesa 
    amount: number; // valor da despesa 
    date: Date; // data da despesa 
}

// Schema do Mongoose (estrutura do banco de dados)
const ExpenseSchema: Schema = new Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true, min: [0.01, 'O valor da despesa deve ser positivo.'] }, // Validação de valor positivo 
    date: { type: Date, required: true, default: Date.now }, // Valor padrão para data atual 
});

// Exportar o modelo Mongoose
export default mongoose.model<IExpense>('Expense', ExpenseSchema);