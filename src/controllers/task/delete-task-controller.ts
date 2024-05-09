import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { DeleteTaskUseCase } from "@/useCase/task/delete-task-usecase";
import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";
import { PrismaTaskRepository } from "@/repositories/task/prisma-task-repository";

export async function deleteTaskController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const taskSchema = z.object({
    userId: z.string(),
    taskId: z.string(),
  });

  const { userId, taskId } = taskSchema.parse(request.body);
  try {
    const taskRepository = new PrismaTaskRepository();
    const userRepository = new PrismaUserRepository();
    const taskDelete = new DeleteTaskUseCase(taskRepository, userRepository);

    await taskDelete.execute(userId, taskId);

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send(error.issues);
    }
    return reply.status(400).send(error);
  }
}
