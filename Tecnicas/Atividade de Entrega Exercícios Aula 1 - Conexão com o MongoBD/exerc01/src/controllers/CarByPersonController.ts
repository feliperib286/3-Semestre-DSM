import { Request, Response } from "express";
import { CarByPerson } from "../models/index.js";

class CarByPersonController {
    // POST /carbyperson
    public async create(req: Request, res: Response): Promise<Response> {
        const { idpeople, idcar } = req.body;
        try {
            // Nota: Para evitar duplicidade de relacionamento (Pessoa X Carro), 
            // você deve adicionar um índice composto unique no Schema CarByPerson (opcional).
            const document = new CarByPerson({ idpeople, idcar });
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            // TODO: Implementar tratamento de erro para required (idpeople, idcar) e unique (se implementado no Schema)
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Esta relação (Pessoa X Carro) já existe" });
            } else if (error && error.errors["idpeople"]) {
                return res.json({ message: error.errors["idpeople"].message });
            } else if (error && error.errors["idcar"]) {
                return res.json({ message: error.errors["idcar"].message });
            }
            return res.json({ message: error.message });
        }
    }

    // GET /carbyperson
    public async list(req: Request, res: Response): Promise<Response> {
        // TODO: Implementar listagem. Use .populate() para trazer os dados da Pessoa e do Carro.
        try {
            const objects = await CarByPerson.find()
                .populate("idpeople")
                .populate("idcar")
                .sort({ idpeople: "asc" });

            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // DELETE /carbyperson
    public async delete(req: Request, res: Response): Promise<Response> {
        // TODO: Implementar busca e exclusão por 'id' do registro de junção
        const { id } = req.body;
        try {
            const object = await CarByPerson.findByIdAndDelete(id);
            if (object) {
                return res.json({ message: "Relação excluída com sucesso" });
            } else {
                return res.json({ message: "Relação inexistente" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // UPDATE não é comum para tabelas de junção simples, mas pode ser implementado se necessário.
}

export default new CarByPersonController();