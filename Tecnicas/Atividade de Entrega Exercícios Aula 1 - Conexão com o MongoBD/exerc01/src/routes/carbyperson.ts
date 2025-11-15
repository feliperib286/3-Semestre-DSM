import { Router } from "express";
import controller from "../controllers/CarByPersonController.js"; 

const routes = Router();

routes.post('/', controller.create);
routes.get('/', controller.list);
routes.delete('/', controller.delete);
// O PUT (update) não é comum para tabelas de junção simples, então o omitimos, 
// mas você pode adicioná-lo se a lógica exigir.

export default routes;