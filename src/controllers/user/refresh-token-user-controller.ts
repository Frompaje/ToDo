import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";
import { getUserUserUseCase } from "@/useCase/user/get-user-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";

export async function getRefreshUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    id: z.string(),
  });
  try {
    const { id } = userSchema.parse(request.params);
    const userRepository = new PrismaUserRepository();
    const userUsecase = new getUserUserUseCase(userRepository);

    await userUsecase.execute(id);
    return reply.status(200).send(id);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send(error.issues);
    }

    return reply.status(400).send(error);
  }
}
