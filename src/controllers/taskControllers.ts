import { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { Tasks } from "../models/task.js";

const taskModels = new Tasks();

export class TaskController {
  async getTask(req: Request, res: Response) {
    try {
      const getTaskExecute = await taskModels.findAll();
      res.send(getTaskExecute);
    } catch (erro) {
      console.log(`Não foi possivel mostrar as taks. Erro :${erro}`);
    }
  }

  async created(req: Request, res: Response) {
    const { title, description, status } = req.body;
    const id = randomUUID();
    try {
      await taskModels.createTask({ id, title, status, description });
      console.log(`Task criada com sucesso!`);
      const getTaskExecute = await taskModels.findAll();
      res.status(201).send(getTaskExecute);
    } catch (erro) {
      console.log(`Não foi possivel criar a task. Erro: ${erro}`);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body;
    try {
      await taskModels.deleteTask(id);
      const getTaskExecute = await taskModels.findAll();
      res.status(200).send(getTaskExecute);
    } catch (Erro) {
      console.log(`ocorreu um erro ao deletar o ${id}, Erro:${Erro}`);
      res.status(500).send("Ocorreu um erro ao deletar, tente novamente");
    }
  }
  async update(req: Request, res: Response) {
    const { id, title, description, status } = req.body;
    if (title == "" && description == "" && status == "") {
      res.status(400).send("Você precisa enviar as atualizações");
      return;
    }
    try {
      await taskModels.updateTask({
        title,
        description,
        status,
        id,
      });
      res.status(200).send();
    } catch (erro) {
      res.status(500).send(`Ocorreu um erro:${erro}`);
    }
  }
}
