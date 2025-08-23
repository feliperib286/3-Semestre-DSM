import e, { Router, Request, Response } from 'express';
import { Client } from '../models/Client';

const router = Router();

// Rota Post -> Criar um novo cliente
router.post('/clients', async (req: Request, res: Response) => {
  try {
    const novoCliente = new Client(req.body);
    const clienteSalvo = await novoCliente.save();//salva no mongoDB
    res.status(201).json(clienteSalvo);
  } catch (error: unknown) {
    //tratamento seguro do erro (unknown )  
    if (error instanceof Error) {
      res.status(400).json({ erro: error.message });
    } else {
        res.status(400).json({ erro: String(error) });
      }

    }
  });

// Rota Get -> Listar todos os clientes
router.get('/', async (req: Request, res: Response) => {
  try {
    const clientes = await Client.find(); //busca todos os clientes no mongoDB
    res.json(clientes);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ erro: error.message });
    } else {
      res.status(400).json({ erro: String(error) });
    }
  }
});
export default router;