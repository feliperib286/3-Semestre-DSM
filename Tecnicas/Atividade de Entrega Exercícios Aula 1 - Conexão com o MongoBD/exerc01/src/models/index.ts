import mongoose from "mongoose";
const { Schema } = mongoose;

// 1. Schema People (1:N com phones, N:M com cars)
const PersonSchema = new Schema({
    name: {
        type: String,
        maxlength: [30, "O nome pode ter no máximo 30 caracteres"],
        unique: true, // Requisito d): name da coleção people não pode ser repetido 
        required: [true, "O nome é obrigatório"]
    }
});

// 2. Schema Cars (N:M com people)
const CarSchema = new Schema({
    model: {
        type: String,
        maxlength: [15, "O modelo pode ter no máximo 15 caracteres"],
        unique: true, // Requisito d): model da coleção cars não pode ser repetido 
        required: [true, "O modelo é obrigatório"]
    }
});

// 3. Schema Phones (N:1 com people)
const PhoneSchema = new Schema({
    // Requisito e): número com 11 dígitos numéricos 
    number: {
        type: String, // Usar String para aplicar RegEx
        match: [/^[0-9]{11}$/, 'O número deve ter exatamente 11 dígitos numéricos.'], // Requisito e) [cite: 666]
        required: [true, "O número é obrigatório"]
    },
    // Chave Estrangeira: idpeople (FK)
    idpeople: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person", // Referencia o Model Person
        required: [true, "O ID da pessoa é obrigatório"],
        // Validação de existência é opcional, mas recomendada (igual Exercício 1 da aula):
        // validate: { validator: async (id) => !!await Person.findById(id), message: 'Pessoa não existe' }
    }
});

// 4. Schema CarByPerson (N:M Tabela de Junção)
const CarByPersonSchema = new Schema({
    // idpeople (FK)
    idpeople: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
        required: [true, "O ID da pessoa é obrigatório"]
    },
    // idcar (FK)
    idcar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car", // Referencia o Model Car
        required: [true, "O ID do carro é obrigatório"]
    }
    // Opcional: Adicionar índice composto para garantir que uma pessoa não registre o mesmo carro duas vezes.
    // PersonSchema.index({ idpeople: 1, idcar: 1 }, { unique: true });
});

// 5. Criação dos Modelos
const Person = mongoose.model("Person", PersonSchema);
const Car = mongoose.model("Car", CarSchema);
const Phone = mongoose.model("Phone", PhoneSchema);
const CarByPerson = mongoose.model("CarByPerson", CarByPersonSchema);

// Exportação dos modelos
export { Person, Car, Phone, CarByPerson };