import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaTaskRepository } from "@/repositories/task/prisma-repository-task";
import { UpdateTaskUseCase } from "@/useCase/task/update-task-usecase";
import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";

export async function updateTaskController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const taskSchema = z.object({
    userId: z.string(),
    taskId: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.string(),
  });

  const { userId, taskId, title, description, status } = taskSchema.parse(
    request.body
  );
  try {
    const taskRepository = new PrismaTaskRepository();
    const userRepository = new PrismaUserRepository();
    const taskUpdate = new UpdateTaskUseCase(taskRepository, userRepository);
    await taskUpdate.execute(userId, taskId, title, description, status);
    return reply.status(200).send({});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send(error.issues);
    }
    return reply.status(400).send(error);
  }
}
