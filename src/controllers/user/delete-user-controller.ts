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

  try {
    const userRepository = new PrismaUserRepository();
    const deleteUser = new DeleteUserUseCase(userRepository);
    const user = await deleteUser.execute({ id });

    return reply.status(200).send({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send(error.issues);
    }
    return reply.status(400).send();
  }
}
