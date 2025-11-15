import { Request, Response } from "express";
import { Person, Phone } from "../models/index.js"; 
// Phone é importado para fins de deleção em cascata (opcional, mas boa prática)

class PersonController {
    // POST /person
    public async create(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;
        try {
            const document = new Person({ name });
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            // Trata a violação de restrição única (código 11000/11001) [cite: 300]
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este nome de pessoa já está em uso" });
            } 
            // Trata erros de validação do Schema (ex: required)
            else if (error && error.errors["name"]) {
                return res.json({ message: error.errors["name"].message });
            }
            return res.json({ message: error.message });
        }
    }

    // GET /person
    public async list(_: Request, res: Response): Promise<Response> {
        try {
            const objects = await Person.find().sort({ name: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // PUT /person
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, name } = req.body;
        try {
            const document = await Person.findById(id);

            if (!document) {
                return res.json({ message: "Pessoa inexistente" });
            }
            
            document.name = name;
            const resp = await document.save(); // Salva e aplica a validação de unique
            return res.json(resp);

        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "O nome de pessoa já está em uso" });
            } else if (error && error.errors["name"]) {
                return res.json({ message: error.errors["name"].message });
            }
            return res.json({ message: error.message });
        }
    }
    
    // DELETE /person
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        try {
            // Deleção em Cascata (Opcional): Apaga todos os telefones associados a esta pessoa
            await Phone.deleteMany({ idpeople: id });

            const object = await Person.findByIdAndDelete(id);
            if (object) {
                return res.json({ message: "Registro de pessoa excluído com sucesso" });
            } else {
                return res.json({ message: "Registro de pessoa inexistente" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new PersonController();