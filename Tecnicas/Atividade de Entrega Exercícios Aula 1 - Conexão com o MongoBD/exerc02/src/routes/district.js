import { Router } from "express";
import controller from "../controllers/DistrictController.js"; // Vai ser criado depois
const routes = Router();
routes.post('/', controller.create); // Ex: Adicionar distrito a uma cidade (via id_city)
routes.get('/', controller.list);
routes.delete('/', controller.delete);
routes.put('/', controller.update);
export default routes;
//# sourceMappingURL=district.js.map