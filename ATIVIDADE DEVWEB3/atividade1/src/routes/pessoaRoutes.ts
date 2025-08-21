import { Router } from 'express';
import { criarPessoa, listarPessoas, buscarPessoaPorId, atualizarPessoa, excluirPessoa } from '../controllers/pessoaController';

const router = Router();

router.post('/', criarPessoa);
router.get('/', listarPessoas);
router.get('/:id', buscarPessoaPorId);
router.put('/:id', atualizarPessoa);
router.delete('/:id', excluirPessoa);

export default router;
