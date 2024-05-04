import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaTaskRepository } from "@/repositories/task/prisma-repository-task";
import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";
import { CreateTaskUseCase } from "@/useCase/task/create-task-usecase";

export async function createTaskController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const taskSchema = z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      status: z.string(),
    });

    const { title, description, status, id } = taskSchema.parse(request.body);

    const taskRepository = new PrismaTaskRepository();
    const userRepository = new PrismaUserRepository();
    const createTask = new CreateTaskUseCase(taskRepository, userRepository);

    const task = await createTask.execute({
      userId: id,
      title,
      description,
      status,
    });
    return reply.status(201).send({ task });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send(error.issues);
    }
    return reply.status(400).send(error);
  }
}
