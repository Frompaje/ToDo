import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaTaskRepository } from "@/repositories/task/prisma-repository-task";
import { GetTaskUseCase } from "@/useCase/task/get-task-usecase";
import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";

export async function getTaskController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const taskSchema = z.object({
      userId: z.string(),
    });

    const { userId } = taskSchema.parse(request.params);
    const taskRepository = new PrismaTaskRepository();
    const userRepository = new PrismaUserRepository();

    const taskGet = new GetTaskUseCase(taskRepository, userRepository);
    const tasks = await taskGet.execute(userId);

    return reply.status(200).send({ tasks });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send(error.issues);
    }
    return reply.status(404).send(error);
  }
}
