import { Router } from 'express';
import { associarPessoaCarro, listarAssociacoes, excluirAssociacao } from '../controllers/pessoaPorCarroController';

const router = Router();

router.post('/', associarPessoaCarro);
router.get('/', listarAssociacoes);
router.delete('/', excluirAssociacao);

export default router;
