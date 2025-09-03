import { Router, Request, Response} from "express";
import Cliente from "../models/Cliente"

const router = Router()

// Rota POST -> Criar novo cliente

router.post('/', async (req: Request, res: Response) => {
    try{
        const novoCliente = new Cliente(req.body);
        const clienteSalvo = await novoCliente.save(); //salva no MongoDB
        res.status(201).json(clienteSalvo);
    }catch(erro: unknown){
        // Tratamento seguro do erro (unknow)
        if (erro instanceof Error){
            res.status(400).json({erro: erro.message});
        } else {
            res.status(400).json({ erro: String(erro) });
        }
    }
});

//Rot GET -> Listar os clientes cadastrados

router.get("/", async (_req: Request, res: Response) => {
    try{
        const clientes = await Cliente.find(); //buscar todos os clientes
        res.json(clientes);
    } catch (erro: unknown) {
        if (erro instanceof Error){
            res.status(500).json({ erro: erro.message });
        } else {
            res.status(500).json ({ erro: String(erro) });
        }
    }
});

//Rota PUT - altera os dados do cliente

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const clienteAtualizado = await Cliente.findByIdAndUpdate(
            id,
            req.body,
            {new: true} //devolve o cliente atualizado
        );
        
        if(!clienteAtualizado){
            return res.status(404).json({erri: "Cliente não encontrado"});
        }
        res.json(clienteAtualizado);
            } catch (erro: unknown){
                if(erro instanceof Error){
                    res.status(400).json({erro: erro.message});
                } else {
                    res.status(400).json({erro: String(erro)});
                }
            }
        });

// Rota DELETE -> Excluir clientes por ID

router.delete("/:id", async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const clienteRemovido = await Cliente.findByIdAndDelete(id);

        if (!clienteRemovido) {
            return res.status(404).json({ erro: "Cliente não encontrado" });
        }
        res.json({ mensagem: "Cliente excluído com sucesso "});
    } catch (erro: unknown) {
        if(erro instanceof Error){
            res.status(400).json({ erro: erro.message});
        } else {
            res.status(400).json({ erro: String(erro) });
        }
    }
});

export default router;