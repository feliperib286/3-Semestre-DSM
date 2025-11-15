import { Request, Response } from "express";
import { Car } from "../models/index.js";

class CarController {
    // POST /car
    public async create(req: Request, res: Response): Promise<Response> {
        const { model } = req.body;
        try {
            const document = new Car({ model });
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            // TODO: Adicionar tratamento de erro para unique (11000) e validação de 'model'
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este modelo de carro já está em uso" });
            } else if (error && error.errors["model"]) {
                return res.json({ message: error.errors["model"].message });
            }
            return res.json({ message: error.message });
        }
    }

    // GET /car
    public async list(_: Request, res: Response): Promise<Response> {
        // TODO: Implementar listagem e ordenação por 'model'
        try {
            const objects = await Car.find().sort({ model: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // PUT /car
    public async update(req: Request, res: Response): Promise<Response> {
        // TODO: Implementar busca, atualização do 'model', salvamento e tratamento de erros (unique)
        const { id, model } = req.body;
        try {
            const document = await Car.findById(id);

            if (!document) {
                return res.json({ message: "Carro inexistente" });
            }
            
            document.model = model;
            const resp = await document.save();
            return res.json(resp);

        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este modelo de carro já está em uso" });
            } else if (error && error.errors["model"]) {
                return res.json({ message: error.errors["model"].message });
            }
            return res.json({ message: error.message });
        }
    }
    
    // DELETE /car
    public async delete(req: Request, res: Response): Promise<Response> {
        // TODO: Implementar busca e exclusão por 'id'
        const { id } = req.body;
        try {
            const object = await Car.findByIdAndDelete(id);
            if (object) {
                return res.json({ message: "Registro de carro excluído com sucesso" });
            } else {
                return res.json({ message: "Registro de carro inexistente" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new CarController();