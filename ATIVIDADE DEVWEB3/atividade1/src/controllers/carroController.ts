import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const criarCarro = async (req: Request, res: Response) => {
  try {
    const { Idprova, modelo } = req.body;
    const carro = await prisma.carro.create({
      data: { Idprova, modelo },
    });
    res.json(carro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar carro' });
  }
};

export const listarCarros = async (_req: Request, res: Response) => {
  try {
    const carros = await prisma.carro.findMany();
    res.json(carros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar carros' });
  }
};

export const buscarCarroPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const carro = await prisma.carro.findUnique({
      where: { Idprova: Number(id) },
    });
    if (!carro) return res.status(404).json({ error: 'Carro não encontrado' });
    res.json(carro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar carro' });
  }
};

export const atualizarCarro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { modelo } = req.body;
    const carro = await prisma.carro.update({
      where: { Idprova: Number(id) },
      data: { modelo },
    });
    res.json(carro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar carro' });
  }
};

export const excluirCarro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.carro.delete({
      where: { Idprova: Number(id) },
    });
    res.json({ message: 'Carro excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir carro' });
  }
};
