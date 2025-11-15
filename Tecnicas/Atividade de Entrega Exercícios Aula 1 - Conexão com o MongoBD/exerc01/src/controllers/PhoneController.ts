import { Request, Response } from "express";
import { Phone } from "../models/index.js";

class PhoneController {
    // POST /phone
    public async create(req: Request, res: Response): Promise<Response> {
        const { number, idpeople } = req.body;
        try {
            const document = new Phone({ number, idpeople });
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            // TODO: Implementar tratamento de erro para validações de 'number' (RegEx) e 'idpeople' (required/validate)
            if (error && error.errors["number"]) {
                return res.json({ message: error.errors["number"].message });
            } else if (error && error.errors["idpeople"]) {
                return res.json({ message: error.errors["idpeople"].message });
            }
            return res.json({ message: error.message });
        }
    }

    // GET /phone
    public async list(req: Request, res: Response): Promise<Response> {
        // TODO: Implementar listagem, talvez buscando por um 'idpeople' específico para ver os telefones de uma pessoa
        const { idpeople } = req.body;
        try {
            const query = idpeople ? { idpeople } : {};
            // O .populate("idpeople") é útil para trazer o nome da pessoa junto com o telefone
            const objects = await Phone.find(query).populate("idpeople").sort({ number: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // PUT /phone
    public async update(req: Request, res: Response): Promise<Response> {
        // TODO: Implementar busca, atualização, salvamento e tratamento de erros (RegEx, idpeople)
        const { id, number, idpeople } = req.body;
        try {
            const document = await Phone.findById(id);

            if (!document) {
                return res.json({ message: "Telefone inexistente" });
            }
            
            document.number = number;
            document.idpeople = idpeople;
            const resp = await document.save();
            return res.json(resp);

        } catch (error: any) {
             if (error && error.errors["number"]) {
                return res.json({ message: error.errors["number"].message });
            } else if (error && error.errors["idpeople"]) {
                return res.json({ message: error.errors["idpeople"].message });
            }
            return res.json({ message: error.message });
        }
    }
    
    // DELETE /phone
    public async delete(req: Request, res: Response): Promise<Response> {
        // TODO: Implementar busca e exclusão por 'id'
        const { id } = req.body;
        try {
            const object = await Phone.findByIdAndDelete(id);
            if (object) {
                return res.json({ message: "Registro de telefone excluído com sucesso" });
            } else {
                return res.json({ message: "Registro de telefone inexistente" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new PhoneController();