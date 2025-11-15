import type { Request, Response } from "express";
declare class StateController {
    create(req: Request, res: Response): Promise<Response>;
    list(_: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
}
declare const _default: StateController;
export default _default;
//# sourceMappingURL=StateController.d.ts.map