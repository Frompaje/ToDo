import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaTaskRepository } from "@/repositories/task/prisma-repository-task";
import { UpdateTaskUseCase } from "@/useCase/task/update-task-usecase";

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
    const taskUpdate = new UpdateTaskUseCase(taskRepository);
    await taskUpdate.execute(userId, taskId, title, description, status);
    return reply.status(200).send({});
  } catch (error) {
    console.log(error);
    return reply.status(500).send();
  }
}
