import { MailAdapter } from "@/repositories/mail/nodeMail-adapter";
import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";
import { CreateUserUseCase } from "@/useCase/user/create-user-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2).max(30),
  });

  try {
    const { email, name } = userSchema.parse(request.body);

    const userRepository = new PrismaUserRepository();
    const mailRepository = new MailAdapter();
    const createUseCase = new CreateUserUseCase(userRepository, mailRepository);

    await createUseCase.execute({ email, name });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send(error.issues);
    }

    return reply.status(400).send(error);
  }
}
