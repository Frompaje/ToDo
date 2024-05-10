import { MailAdapter } from "@/repositories/mail/nodeMail-adapter";
import { PrismaTokenRepository } from "@/repositories/token/prisma-token-repository";
import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";
import { resendUserUserUseCase } from "@/useCase/user/resend-user-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";

export async function resendUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    email: z.string(),
  });
  try {
    const { email } = userSchema.parse(request.body);

    const userRepository = new PrismaUserRepository();
    const tokenRepository = new PrismaTokenRepository();
    const emailRepository = new MailAdapter();
    const sendRepository = new resendUserUserUseCase(
      userRepository,
      tokenRepository,
      emailRepository
    );

    await sendRepository.execute(email);

    return reply.status(200).send(email);
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return reply.status(400).send(error.issues);
    }

    return reply.status(400).send(error);
  }
}
