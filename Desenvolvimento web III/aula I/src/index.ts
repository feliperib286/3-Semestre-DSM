// import o framework Express
import express from "express";
import dotenv from "dotenv";
import { taskRouters} from "./routers/taskrouters";

dotenv.config();

const.app = express();

app.user(express.json());
 
app.get("/", (req, res) => {
    res.send("API aula1 List esta rodando! Acesse /task para usar")

});

app.use("/task", taskRouters);


app.listen(3000,() => {
    console.log("Servidor rodando em http://localhost:3000");
});