import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaTaskRepository } from "@/repositories/task/prisma-repository-task";
import { CreateTaskUseCase } from "@/useCase/task/create-task-usecase";

export async function createTaskController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const taskSchema = z.object({
    userId: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.string(),
  });

  const { title, description, status, userId } = taskSchema.parse(request.body);
  try {
    const taskRepository = new PrismaTaskRepository();
    const createTask = new CreateTaskUseCase(taskRepository);
    const task = await createTask.execute({
      userId,
      title,
      description,
      status,
    });
    console.log(task);

    return reply.status(201).send(task);
  } catch (error) {
    console.log(error);
    return reply.status(500).send();
  }
}
