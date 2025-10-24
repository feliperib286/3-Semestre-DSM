import mongoose, { Schema, Document } from "mongoose";

// 1. Interface TypeScript para o documento do MongoDB
export interface IDisco extends Document {
    titulo: string;
    artista: string; // Adaptado de 'autor'
    ano: number;
    genero: string; // Novo campo para o projeto de Discos
    formato: 'Vinil' | 'CD'; // Novo campo e tipo restrito
    preco: number; // Novo campo
}

// 2. Schema do Mongoose (estrutura do banco de dados)
const discoSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    artista: { type: String, required: true },
    ano: { type: Number, required: true },
    genero: { type: String, required: true },
    formato: { type: String, required: true, enum: ['Vinil', 'CD'] },
    preco: { type: Number, required: true },
});

// 3. Exportar o modelo Mongoose
export default mongoose.model<IDisco>('Disco', discoSchema);