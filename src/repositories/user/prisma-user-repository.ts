import { prisma } from "@/database/db";

export class PrismaUserRepository {
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
