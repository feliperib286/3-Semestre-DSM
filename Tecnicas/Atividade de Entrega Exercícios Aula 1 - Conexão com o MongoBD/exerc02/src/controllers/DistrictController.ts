import type { Request, Response } from "express";
import { State } from "../models/index.js"; // Importa o modelo principal

class DistrictController {
    // Adiciona um novo Distrito a uma Cidade (requer id do State e id da City)
    public async create(req: Request, res: Response): Promise<Response> {
        const { stateId, cityId, name } = req.body;
        try {
            const state = await State.findById(stateId);
            if (!state) {
                return res.json({ message: "Estado não encontrado" });
            }

            const city = state.cities.id(cityId);
            if (!city) {
                return res.json({ message: "Cidade não encontrada no Estado" });
            }

            // Adiciona o novo subdocumento District ao array 'districts' da City
            city.districts.push({ name });
            
            const resp = await state.save(); // Salva o documento State (e todos os seus subdocumentos)
            
            // Retorna apenas o distrito recém-adicionado
            const newDistrict = city.districts[city.districts.length - 1]; 
            return res.json(newDistrict);

        } catch (error: any) {
            if (error && error.errors["name"]) {
                return res.json({ message: error.errors["name"].message });
            }
            return res.json({ message: error.message });
        }
    }

    // Lista todos os distritos de uma Cidade (requer id do State e id da City)
    public async list(req: Request, res: Response): Promise<Response> {
        const { stateId, cityId } = req.body;
        try {
            const state = await State.findById(stateId);
            if (!state) {
                return res.json({ message: "Estado não encontrado" });
            }

            const city = state.cities.id(cityId);
            if (!city) {
                return res.json({ message: "Cidade não encontrada no Estado" });
            }
            
            // Retorna o array de distritos da cidade
            return res.json(city.districts); 
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // Atualiza um distrito (subdocumento aninhado)
    public async update(req: Request, res: Response): Promise<Response> {
        const { stateId, cityId, districtId, name } = req.body;
        try {
            const state = await State.findById(stateId);
            if (!state) {
                return res.json({ message: "Estado não encontrado" });
            }
            
            const city = state.cities.id(cityId);
            if (!city) {
                return res.json({ message: "Cidade não encontrada no Estado" });
            }

            // Encontra o subdocumento District
            const district = city.districts.id(districtId);

            if (!district) {
                return res.json({ message: "Distrito não encontrado na Cidade" });
            }
            
            district.name = name; // Atualiza o campo

            await state.save(); // Salva o documento State
            return res.json(district);

        } catch (error: any) {
            if (error && error.errors["name"]) {
                return res.json({ message: error.errors["name"].message });
            }
            return res.json({ message: error.message });
        }
    }
    
    // Deleta um distrito (subdocumento aninhado)
    public async delete(req: Request, res: Response): Promise<Response> {
        const { stateId, cityId, districtId } = req.body;
        try {
            const state = await State.findById(stateId);
            if (!state) {
                return res.json({ message: "Estado não encontrado" });
            }
            
            const city = state.cities.id(cityId);
            if (!city) {
                return res.json({ message: "Cidade não encontrada no Estado" });
            }
            
            // Remove o subdocumento do array
            const district = city.districts.id(districtId);
            if (!district) {
                return res.json({ message: "Distrito não encontrado na Cidade" });
            }

            district.deleteOne(); // Mongoose método para remover subdocumento
            
            await state.save();
            return res.json({ message: "Distrito excluído com sucesso" });
            
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new DistrictController();