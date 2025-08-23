import e from "express";
import mongoose,{Schema,Document} from "mongoose";

//Interface  que define the structure of a Client document no type
export interface IClient extends Document {
  name: string;   
  telefone: string;
  email: string;
  criadorEm: Date;
}

//definindo  o esquema (estrutura do documento no mongoDB)

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true},//campo obrigatório
  email: { type: String, required: true, unique: true }, //campo obrigatório e único
  telefone: { type: String, required: true }, //campo obrigatório
  criadorEm: { type: Date, default: Date.now } //data automática de criação
});

//exportando o modelo para ser usado no CRUD
export const Client = mongoose.model<IClient>("Client", ClientSchema);