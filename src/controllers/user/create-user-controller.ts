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
    password: z.string(),
  });

  const { password, email } = userSchema.parse(request.body);

  const userRepository = new PrismaUserRepository();
  const createUseCase = new CreateUserUseCase(userRepository);

  const { user } = await createUseCase.execute({ password, email });

  return reply.status(201).send(user);
}
