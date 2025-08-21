import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const associarPessoaCarro = async (req: Request, res: Response) => {
  try {
    const { pessoa_id, carro_Idprova } = req.body;
    const associacao = await prisma.pessoaPorCarro.create({
      data: { pessoa_id, carro_Idprova },
    });
    res.json(associacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao associar pessoa e carro' });
  }
};

export const listarAssociacoes = async (_req: Request, res: Response) => {
  try {
    const associacoes = await prisma.pessoaPorCarro.findMany({
      include: { pessoa: true, carro: true },
    });
    res.json(associacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar associações' });
  }
};

export const excluirAssociacao = async (req: Request, res: Response) => {
  try {
    const { pessoa_id, carro_Idprova } = req.body;
    await prisma.pessoaPorCarro.delete({
      where: {
        carro_Idprova_pessoa_id: {
          carro_Idprova: Number(carro_Idprova),
          pessoa_id: Number(pessoa_id),
        },
      },
    });
    res.json({ message: 'Associação removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir associação' });
  }
};
