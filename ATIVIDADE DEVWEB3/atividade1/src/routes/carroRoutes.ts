import { Router } from 'express';
import { criarCarro, listarCarros, buscarCarroPorId, atualizarCarro, excluirCarro } from '../controllers/carroController';

const router = Router();

router.post('/', criarCarro);
router.get('/', listarCarros);
router.get('/:id', buscarCarroPorId);
router.put('/:id', atualizarCarro);
router.delete('/:id', excluirCarro);

export default router;
