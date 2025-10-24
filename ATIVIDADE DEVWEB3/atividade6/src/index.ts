import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
// Importa o modelo IDisco e o Disco model
import Disco, { IDisco } from './models/disco'; 

const app = express();
const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost:27017/crud_discos'; // Nome do DB alterado

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve arquivos estáticos do frontend
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB conectado ao DB: crud_discos'))
    .catch(err => console.log('Erro ao conectar ao MongoDB', err));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`); // Rodando em localhost:3000 
});

// ----------------------------------------------------
// ROTAS CRUD PARA DISCOS
// ----------------------------------------------------

// Rota 1: Cadastrar um novo Disco (CREATE) 
app.post('/discos', async (req: Request, res: Response) => {
    try {
        const novoDisco = new Disco(req.body); // O corpo da requisição deve seguir a interface IDisco
        const discoSalvo = await novoDisco.save();
        res.status(201).json(discoSalvo);
    } catch (error) {
        // As validações do Mongoose (como 'required') acionarão este erro
        res.status(500).json({ message: 'Erro ao cadastrar disco', error });
    };
});

// Rota 2: Listar todos os Discos (READ) 
app.get('/discos', async (req: Request, res: Response) => {
    try {
        const discos = await Disco.find();
        res.json(discos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar discos' });
    }
});

// Rota 3: Atualizar um Disco (UPDATE) 
app.put('/discos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const dadosAtualizados: Partial<IDisco> = req.body;
    try {
        const discoAtualizado = await Disco.findByIdAndUpdate(id, dadosAtualizados, { new: true });
        if (!discoAtualizado) {
            return res.status(404).json({ error: 'Disco não encontrado' });
        }
        res.json(discoAtualizado);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar disco' });
    }
});

// Rota 4: Deletar um Disco (DELETE) 
app.delete('/discos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const discoDeletado = await Disco.findByIdAndDelete(id);
        if (!discoDeletado) {
            return res.status(404).json({ error: 'Disco não encontrado' });
        }
        res.status(204).send(); // Status 204 indica sucesso sem conteúdo
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar disco' });
    }
});