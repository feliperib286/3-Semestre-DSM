import mongoose from "mongoose";

// Mudar para bdexer01
const uri = "mongodb://127.0.0.1:27017/bdexer01"; //

export default function connect() {
  // ... (Restante do código de conexão)
  mongoose.connection.on("connected", () => console.log("MongoDB connected"));
  // ...
  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    })
    .then(() => console.log("Conectado ao MongoDB: bdexer01")) // Confirma o novo BD
    // ...
}