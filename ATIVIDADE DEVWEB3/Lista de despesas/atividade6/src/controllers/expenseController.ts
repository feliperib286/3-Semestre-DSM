import { Request, Response } from 'express';
import Expense, { IExpense } from '../models/Expense';

// 1. CREATE: Inserir nova despesa
export const createExpense = async (req: Request, res: Response) => {
    try {
        const newExpense = new Expense(req.body);
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error: any) {
        res.status(400).json({ error: 'Erro ao cadastrar despesa', details: error.message });
    }
};

// 2. READ (Lista): Listar todas as despesas 
export const listExpenses = async (req: Request, res: Response) => {
    try {
        // Ordenar por data mais recente
        const expenses = await Expense.find().sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar despesas' });
    }
};

// 3. READ (Detalhe): Buscar despesa por ID (útil para edição)
export const getExpenseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ error: 'Despesa não encontrada' });
        }
        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar despesa' });
    }
};

// 4. UPDATE: Atualizar despesa 
export const updateExpense = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData: Partial<IExpense> = req.body;
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true }); // runValidators garante validação do Mongoose
        if (!updatedExpense) {
            return res.status(404).json({ error: 'Despesa não encontrada' });
        }
        res.json(updatedExpense);
    } catch (error: any) {
        res.status(400).json({ error: 'Erro ao atualizar despesa', details: error.message });
    }
};

// 5. DELETE: Remover despesa 
export const deleteExpense = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ error: 'Despesa não encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar despesa' });
    }
};

// 6. GET TOTAL: Obter o somatório das despesas
export const getTotalExpenses = async (req: Request, res: Response) => {
    try {
        const total = await Expense.aggregate([
            {
                $group: {
                    _id: null, // Agrupar todos os documentos
                    totalAmount: { $sum: "$amount" } // Somar o campo 'amount'
                }
            }
        ]);

        // --- A CORREÇÃO ESTÁ AQUI ---
        // Verificamos se o array 'total' tem algum resultado.
        // Se total.length > 0 (tem resultado), usamos total[0].totalAmount.
        // Se não (está vazio), usamos 0.
        const totalAmount = total.length > 0 ? total[0].totalAmount : 0; 
        
        res.json({ totalAmount });

    } catch (error) {
        console.error("Erro no aggregate de total:", error); // Adiciona log no servidor
        res.status(500).json({ error: 'Erro ao calcular o total das despesas' });
    }
};