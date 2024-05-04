import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaTaskRepository } from "@/repositories/task/prisma-repository-task";
import { GetTaskUseCase } from "@/useCase/task/get-task-usecase";

export async function getTaskController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const taskSchema = z.object({
    taskId: z.string(),
  });

  const { taskId } = taskSchema.parse(request.body);

  try {
    const taskRepository = new PrismaTaskRepository();
    const taskGet = new GetTaskUseCase(taskRepository);

    const tasks = await taskGet.execute(taskId);

    return reply.status(200).send({ tasks });
  } catch (error) {
    console.log(error);
    return reply.status(500).send();
  }
}
