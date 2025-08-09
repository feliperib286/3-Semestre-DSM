import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"; 

// Cria Instancia do prisma para o poder realizar
// consultas e alterações 
const prisma = new PrismaClient();
//funcao para listar as tarefas do banco de dados 
export const getTasks = async (req: Request, res: Response) => {
    const tasks = await prisma.task.findMany();
    console.log("Tarefas encontradas:", tasks); // debug
    res.json(tasks);
   };
    // funcao para criar as  tarefas do banco de dados 
   export const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const task = await prisma.task.create({
      data: { title, description },
    });
    res.status(201).json(task);
   };
    // fazer um update nas tarefas nos banco de dados 
   export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, done } = req.body;
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, done }, // campos a serem alterados 
    });
    // retorna a tarefa atualizada
    res.json(task);
   };
    //fazer o delet das  tarefas no banco de dados 
   export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.task.delete({ where: { id: Number(id) } });
    res.status(204).send();
   };