import mongoose, {Schema, Document} from "mongoose";

// Interface que define a estrutura Cliente

export interface ICliente extends Document {
    nome: string;
    email: string;
    telefone: string;
    criadoEm: Date;
}

// Definindo o esquema (estrutura do documento no MongoDB)

const ClienteSchema: Schema = new Schema({
    nome: {type: String, required: true }, //campo obrigatrio
    email: {type: String, required: true, unique: true}, //nao pode repetir
    telefone: { type: String, required: true},
    criadoEm: {type: Date, default: Date.now } //Data automática
});

//Exportar modelo para ser usado

export default mongoose.model<ICliente>("Cliente", ClienteSchema)