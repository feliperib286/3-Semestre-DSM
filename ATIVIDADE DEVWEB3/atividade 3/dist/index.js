"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const livro_1 = __importDefault(require("./models/livro"));
const app = (0, express_1.default)();
const PORT = 3000;
const MONGODB_URI = 'mongdb://localhost:27017/crud_livros';
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
//Conectar ao Mongo DB
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log('Erro ao conectar ao MongoDB', err));
//Rota para cadastrar um Livro
app.post('/livros', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const novoLivro = new livro_1.default({
            titulo: req.body.titulo,
            autor: req.body.autor,
            ano: req.body.ano
        });
        const livroSalvo = yield novoLivro.save();
        res.status(201).json(livroSalvo); //Certifique-se que retorne o livro cadastrado
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar livro', error });
    }
    ;
}));
// Rota para listar todos os livros
app.get('/livros', (requestAnimationFrame, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const livros = yield livro_1.default.find();
        res.json(livros);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar livros' });
    }
}));
//Rota para atualizar um livro
app.put('/livros/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { titulo, autor, anoPublicacao } = req.body;
    try {
        const livroAtualizado = yield livro_1.default.findByIdAndUpdate(id, { titulo, autor, anoPublicacao }, { new: true });
        if (!livroAtualizado) {
            return res.status(400).json({ error: 'Livro não encontrado' });
        }
        res.json(livroAtualizado);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar livro' });
    }
}));
//Rota para deletar  um livro
app.put('/livros/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const livroDeletado = yield livro_1.default.findIdAndDelete(id);
        if (!livroDeletado) {
            return res.status(400).json({ error: 'Livro não encontrado' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar livro' });
    }
    ;
}));
//# sourceMappingURL=index.js.map