import { prisma } from "@/database/db";
import { UserRepository } from "@/interface/user-repository";

export class PrismaUserRepository implements UserRepository {
  async findById(id: string) {
    const userExist = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExist) {
      return undefined;
    }

    return userExist;
  }
  async findByEmail(email: string) {
    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExist) {
      return undefined;
    }

    return userExist;
  }

  async create(email: string, name: string) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return user;
  }
  async delete(id: string) {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }
}
