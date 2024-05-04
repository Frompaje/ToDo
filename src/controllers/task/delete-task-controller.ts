import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaTaskRepository } from "@/repositories/task/prisma-repository-task";
import { DeleteTaskUseCase } from "@/useCase/task/delete-task-usecase";

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
    const taskDelete = new DeleteTaskUseCase(taskRepository);

    await taskDelete.execute(userId, taskId);

    return reply.status(200).send({});
  } catch (error) {
    return reply.status(400).send(error);
  }
}
