import { prisma } from "@/database/db";
import { User } from "@/interface/type-user";
import { UserRepository } from "@/interface/user-repository";
import { userInfo } from "os";

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User> {
    const userExist = await prisma.user.findUnique({
      where: { id },
    });

    if (userExist == null) {
      throw new Error("User does not exist");
    }
    return userExist;
  }

  async findByEmail(email: string): Promise<User> {
    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExist) {
      throw new Error("Email could not be found");
    }
    return userExist;
  }

  async create(email: string, name: string, token: number): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        token,
      },
    });

    return user;
  }
  async delete(id: string): Promise<User> {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }

  async deleteToken(id: string, token: number): Promise<User> {
    const user = await prisma.user.delete({
      where: { id, token },
    });
    return user;
  }
}
