import { prisma } from "@/database/db";
import { UserRepository } from "@/interface/user-repository";

export class PrismaUserRepository implements UserRepository {
  async create(email: string, password: string) {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  }
}
