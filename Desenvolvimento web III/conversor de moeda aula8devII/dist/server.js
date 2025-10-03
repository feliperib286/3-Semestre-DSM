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
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "../views")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../views/index.html"));
});
app.get("/convert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, from, to } = req.query;
    if (!amount || !from || !to) {
        return res.status(400).json({ error: "Parâmetros inválidos" });
    }
    try {
        const apiKey = process.env.API_KEY;
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;
        const response = yield axios_1.default.get(url);
        const converted = response.data.conversion_result;
        res.json({ result: `${amount} ${from} = ${converted.toFixed(2)} ${to}` });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao converter moeda." });
    }
}));
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
