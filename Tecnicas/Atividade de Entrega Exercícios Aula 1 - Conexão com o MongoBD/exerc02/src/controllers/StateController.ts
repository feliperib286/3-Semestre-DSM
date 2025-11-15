import type { Request, Response } from "express";
import { State} from "../models/index.js";

class StateController {
    // Cria um novo Estado (e suas cidades/distritos, se fornecidos no body)
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, cities } = req.body;
        try {
            const document = new State({ name, cities }); // Cria uma nova instância [cite: 470]
            const resp = await document.save(); // Salva e aplica validações (unique: true para 'name') [cite: 472]
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) { // Trata erro de índice duplicado (unique) [cite: 476]
                return res.json({ message: "O nome do estado já está em uso" });
            } else if (error && error.errors["name"]) {
                return res.json({ message: error.errors["name"].message }); // Erros de validação do 'name'
            }
            return res.json({ message: error.message });
        }
    }

    // Lista todos os estados
    public async list(_: Request, res: Response): Promise<Response> {
        try {
            const objects = await State.find().sort({ name: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // Atualiza um estado pelo seu _id (apenas o name principal)
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, name } = req.body;
        try {
            const document = await State.findById(id);

            if (!document) {
                return res.json({ message: "Estado inexistente" });
            }
            
            document.name = name;
            const resp = await document.save(); // Salva e aplica validações (unique: true) [cite: 515]
            return res.json(resp);

        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "O nome do estado já está em uso" });
            } else if (error && error.errors["name"]) {
                return res.json({ message: error.errors["name"].message });
            }
            return res.json({ message: error.message });
        }
    }
    
    // Deleta um estado pelo seu _id
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        try {
            const object = await State.findByIdAndDelete(id);
            if (object) {
                return res.json({ message: "Estado excluído com sucesso" });
            } else {
                return res.json({ message: "Estado inexistente" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new StateController();