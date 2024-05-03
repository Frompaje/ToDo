import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";
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

  const user = await userRepository.create(password, email);
  return reply.status(201).send({ user });
}
