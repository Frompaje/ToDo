import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaTaskRepository } from "@/repositories/task/prisma-repository-task";
import { CreateTaskUseCase } from "@/useCase/task/create-task-usecase";
import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";

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
    const userRepository = new PrismaUserRepository();
    const createTask = new CreateTaskUseCase(taskRepository, userRepository);

    const task = await createTask.execute({
      userId,
      title,
      description,
      status,
    });
    return reply.status(201).send(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send(error.issues);
    }
    return reply.status(400).send(error);
  }
}
