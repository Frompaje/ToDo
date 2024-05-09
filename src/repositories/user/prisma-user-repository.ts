import { prisma } from "@/database/db";
import { User } from "@/interface/type-user";
import { UserRepository } from "@/interface/user-repository";

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | undefined> {
    const userExist = await prisma.user.findUnique({
      where: { id },
    });

    return userExist || undefined;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return userExist || undefined;
  }

  async create(email: string, name: string): Promise<User | undefined> {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return user;
  }
  async delete(id: string): Promise<User | undefined> {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }
}
