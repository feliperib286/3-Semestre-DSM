import { Router } from 'express';
import { 
    createExpense, 
    listExpenses, 
    getExpenseById,
    updateExpense, 
    deleteExpense,
    getTotalExpenses // Importa a função de totalização
} from '../controllers/expenseController';

const router = Router();

// Nova rota para o somatório 
router.get('/total', getTotalExpenses); 

// Rotas CRUD
router.post('/', createExpense); // Cadastrar
router.get('/', listExpenses); // Listar todos
router.get('/:id', getExpenseById); // Buscar por ID
router.put('/:id', updateExpense); // Alterar
router.delete('/:id', deleteExpense); // Excluir



export default router;