import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/db";
import { z } from "zod";

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

  await prisma.task.create({
    data: {
      title,
      description,
      status,
      userId: userId,
    },
  });

  return reply.status(201).send();
}
