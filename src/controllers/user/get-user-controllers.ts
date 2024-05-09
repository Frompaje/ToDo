import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";
import { GetUserUserUseCase } from "@/useCase/user/get-user-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";

export async function getUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    id: z.string(),
  });
  try {
    const { id } = userSchema.parse(request.params);

    const userRepository = new PrismaUserRepository();
    const userUsecase = new GetUserUserUseCase(userRepository);
    const user = await userUsecase.execute(id);

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user?.id,
        },
      }
    );

    return reply.status(200).send({ user, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send(error.issues);
    }

    return reply.status(400).send(error);
  }
}
