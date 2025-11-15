import { Router } from "express";
import state from './state.js';
import city from './city.js';
import district from './district.js';
const routes = Router();
routes.use("/state", state);
routes.use("/city", city);
routes.use("/district", district);
// Aceita qualquer método HTTP ou URL desconhecida [cite: 633]
routes.use((_, res) => res.json({ error: "Requisição desconhecida" }));
export default routes;
//# sourceMappingURL=index.js.map