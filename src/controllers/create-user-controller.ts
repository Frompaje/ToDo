import { prisma } from "@/database/db";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = userSchema.parse(request.body);

  const createUser = await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  return reply.status(201).send({ createUser });
}
