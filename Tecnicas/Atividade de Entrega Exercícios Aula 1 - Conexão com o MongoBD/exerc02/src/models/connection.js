import mongoose from "mongoose";
// URI de conexão: 127.0.0.1:27017 é o padrão, e 'bdexer02' é o BD do exercício
const uri = "mongodb://127.0.0.1:27017/bdexer02"; // [cite: 696, 336]
export default function connect() {
    // Configuração de manipuladores de eventos de conexão (opcional, mas útil) [cite: 338, 340]
    mongoose.connection.on("connected", () => console.log("MongoDB connected"));
    mongoose.connection.on("disconnected", () => console.log("MongoDB disconnected"));
    mongoose.connection.on("error", (e) => console.error("MongoDB error:", e));
    // Estabelece a conexão com o MongoDB [cite: 348]
    mongoose
        .connect(uri, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
    })
        .then(() => console.log("Conectado ao MongoDB: bdexer02")) // [cite: 353, 696]
        .catch((e) => {
        console.error("Erro ao conectar ao MongoDB:", e.message); // [cite: 356]
    });
    // Trata o encerramento da aplicação (Ctrl+C) para fechar a conexão [cite: 357]
    process.on("SIGINT", async () => {
        try {
            console.log("Conexão com o MongoDB fechada");
            await mongoose.connection.close();
            process.exit(0);
        }
        catch (error) {
            console.error("Erro ao fechar a conexão com o MongoDB:", error);
            process.exit(1);
        }
    });
}
//# sourceMappingURL=connection.js.map