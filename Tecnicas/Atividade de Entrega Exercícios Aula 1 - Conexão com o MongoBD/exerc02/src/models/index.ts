import mongoose from "mongoose";
const { Schema } = mongoose;

// 1. Esquema do Distrito (District)
// Não precisa de um Model, pois será um Subdocumento
// id: INTEGER, name: VARCHAR(30)
const DistrictSchema = new Schema({
    // MongoDB adiciona o _id automaticamente [cite: 224]
    name: {
        type: String,
        maxlength: [30, "O nome do distrito pode ter no máximo 30 caracteres"],
        required: [true, "O nome do distrito é obrigatório"]
    }
}, { _id: false }); // Usamos { _id: false } para não duplicar o id/ObjectId do subdocumento, 
                    // a não ser que o requisito exija o _id. O padrão é usar o _id do Mongoose[cite: 224].
                    // Caso o requisito seja que o subdocumento tenha seu próprio id, remova { _id: false }
// Nota: Para Mongoose < 6.0.0, subdocumentos recebem _id por padrão, 
// o idcity: INTEGER (FK) do diagrama é implícito na hierarquia de subdocumentos.

// 2. Esquema da Cidade (City)
// Não precisa de um Model, pois será um Subdocumento de State
// id: INTEGER, name: VARCHAR(30)
const CitySchema = new Schema({
    // MongoDB adiciona o _id automaticamente
    name: {
        type: String,
        maxlength: [30, "O nome da cidade pode ter no máximo 30 caracteres"],
        required: [true, "O nome da cidade é obrigatório"]
    },
    // O array 'districts' conterá subdocumentos District [cite: 196, 212]
    districts: [DistrictSchema] // district será subdocumento de city 
}, { _id: false }); // Remova se precisar de _id para Cidades subdocumentos

// 3. Esquema do Estado (State)
// id: INTEGER, name: VARCHAR(20)
const StateSchema = new Schema({
    // MongoDB adiciona o _id automaticamente, que será o 'id' do Estado
    name: {
        type: String,
        maxlength: [20, "O nome do estado pode ter no máximo 20 caracteres"],
        unique: true, // Somente o campo name de State não aceita valores repetidos [cite: 725, 257]
        required: [true, "O nome do estado é obrigatório"]
    },
    // O array 'cities' conterá subdocumentos City [cite: 196, 212]
    cities: [CitySchema] // city será subdocumento de state 
});

// 4. Criação e Exportação do Modelo Principal (State)
// O Mongoose model compila o esquema StateSchema [cite: 132, 457]
const State = mongoose.model("State", StateSchema);
// Os subdocumentos City e District não precisam de modelos, 
// eles existem dentro do modelo State.

// Para permitir a criação e manipulação dos subdocumentos fora do StateController 
// (se necessário nos outros controllers), é útil exportar os Schemas
export { State, CitySchema, DistrictSchema };