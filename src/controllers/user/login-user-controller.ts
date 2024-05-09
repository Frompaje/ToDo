import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";
import { GetUserUserUseCase } from "@/useCase/user/get-user-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";

export async function loginUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    id: z.string(),
    email: z.string(),
  });
  try {
    const { id, email } = userSchema.parse(request.params);
    const userRepository = new PrismaUserRepository();

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send(error.issues);
    }

    return reply.status(400).send(error);
  }
}
