import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const criarPessoa = async (req: Request, res: Response) => {
  try {
    const { id, nome } = req.body;
    const pessoa = await prisma.pessoa.create({
      data: { id, nome },
    });
    res.json(pessoa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pessoa' });
  }
};

export const listarPessoas = async (_req: Request, res: Response) => {
  try {
    const pessoas = await prisma.pessoa.findMany({
      include: { telefones: true, carros: true },
    });
    res.json(pessoas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar pessoas' });
  }
};

export const buscarPessoaPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pessoa = await prisma.pessoa.findUnique({
      where: { id: Number(id) },
      include: { telefones: true, carros: true },
    });
    if (!pessoa) return res.status(404).json({ error: 'Pessoa não encontrada' });
    res.json(pessoa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pessoa' });
  }
};

export const atualizarPessoa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    const pessoa = await prisma.pessoa.update({
      where: { id: Number(id) },
      data: { nome },
    });
    res.json(pessoa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pessoa' });
  }
};

export const excluirPessoa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.pessoa.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Pessoa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir pessoa' });
  }
};
