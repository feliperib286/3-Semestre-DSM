import { Router } from "express";
import controller from "../controllers/CityController.js"; // Vai ser criado depois
const routes = Router();
routes.post('/', controller.create); // Ex: Adicionar cidade a um estado (via id_state)
routes.get('/', controller.list);
routes.delete('/', controller.delete);
routes.put('/', controller.update);
export default routes;
//# sourceMappingURL=city.js.map