import mongoose, {Schema, Document} from "mongoose";

// Interface que define a estrutura Cliente

export interface ILista extends Document {
    nome: string;
    telefone: string;
    quantidade: string;
    criadoEm: Date;
}

// Definindo o esquema (estrutura do documento no MongoDB)

const ListaSchema: Schema = new Schema({
    produto: {type: String, required: true }, //campo obrigatrio
    valor: { type: Number, required: true},
    quantidade: {type: String, required: true }, //campo obrigatrio

    criadoEm: {type: Date, default: Date.now } //Data automática
});

//Exportar modelo para ser usado

export default mongoose.model<ILista>("Lista", ListaSchema)