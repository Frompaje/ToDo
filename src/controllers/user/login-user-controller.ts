import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";
import { LoginUserUserUseCase } from "@/useCase/user/login-user-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";

export async function loginUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    email: z.string(),
    token: z.coerce.number(),
  });
  try {
    const { email, token } = userSchema.parse(request.body);

    const userRepository = new PrismaUserRepository();
    const loginUseCase = new LoginUserUserUseCase(userRepository);

    const user = await loginUseCase.execute(email, token);

    const tokenJWT = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return reply.status(200).send(tokenJWT);
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return reply.status(400).send(error.issues);
    }

    return reply.status(400).send(error);
  }
}
