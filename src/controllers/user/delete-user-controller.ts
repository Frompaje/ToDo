import { PrismaUserRepository } from "@/repositories/user/prisma-user-repository";
import { DeleteUserUseCase } from "@/useCase/user/delete-user-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    id: z.string(),
  });

  const { id } = userSchema.parse(request.body);

  const userRepository = new PrismaUserRepository();
  const deleteUser = new DeleteUserUseCase(userRepository);
  const user = await deleteUser.execute({ id });
  console.log(user);
  return reply.status(200).send({ user });
}
