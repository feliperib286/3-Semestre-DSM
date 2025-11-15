import type { Request, Response } from "express";
import { State } from "../models/index.js"; // Importa o modelo principal

class CityController {
    // Adiciona uma nova cidade a um Estado (requer id do State)
    public async create(req: Request, res: Response): Promise<Response> {
        const { stateId, name, districts } = req.body;
        try {
            const state = await State.findById(stateId);
            if (!state) {
                return res.json({ message: "Estado não encontrado" });
            }

            // O Mongoose permite adicionar um objeto JS normal a um array de subdocumentos.
            state.cities.push({ name, districts });
            
            const resp = await state.save(); // Salva o documento State com a nova cidade
            
            // Retorna apenas a cidade recém-adicionada (opcional: retornar o State completo)
            const newCity = resp.cities[resp.cities.length - 1]; 
            return res.json(newCity); 
        } catch (error: any) {
            if (error && error.errors["name"]) { // Trata validações do subdocumento (ex: required)
                return res.json({ message: error.errors["name"].message });
            }
            return res.json({ message: error.message });
        }
    }

    // Lista todas as cidades de um Estado (requer id do State)
    public async list(req: Request, res: Response): Promise<Response> {
        const { stateId } = req.body;
        try {
            const state = await State.findById(stateId).select("cities"); // Busca apenas o array de cidades
            if (!state) {
                return res.json({ message: "Estado não encontrado" });
            }
            // Mongoose Subdocumentos: Mongoose findById(id) ou find() no array de subdocumentos pode ser usado
            return res.json(state.cities); 
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // Atualiza uma cidade (subdocumento)
    public async update(req: Request, res: Response): Promise<Response> {
        const { stateId, cityId, name } = req.body;
        try {
            const state = await State.findById(stateId);
            if (!state) {
                return res.json({ message: "Estado não encontrado" });
            }
            
            // Encontra o subdocumento City pelo seu _id
            const city = state.cities.id(cityId);

            if (!city) {
                return res.json({ message: "Cidade não encontrada no Estado" });
            }
            
            city.name = name; // Atualiza o campo

            await state.save(); // Salva o documento State (incluindo a modificação no subdocumento)
            return res.json(city);

        } catch (error: any) {
            if (error && error.errors["name"]) {
                return res.json({ message: error.errors["name"].message });
            }
            return res.json({ message: error.message });
        }
    }
    
    // Deleta uma cidade (subdocumento)
    public async delete(req: Request, res: Response): Promise<Response> {
        const { stateId, cityId } = req.body;
        try {
            const state = await State.findById(stateId);
            if (!state) {
                return res.json({ message: "Estado não encontrado" });
            }
            
            // Remove o subdocumento do array
            const city = state.cities.id(cityId);
            if (!city) {
                return res.json({ message: "Cidade não encontrada no Estado" });
            }

            city.deleteOne(); // Mongoose método para remover subdocumento
            
            await state.save();
            return res.json({ message: "Cidade excluída com sucesso" });
            
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new CityController();