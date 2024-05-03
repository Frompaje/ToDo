import { prisma } from "@/database/db";
import { TaskResitory } from "@/interface/task-repository";

export class PrismaTaskRepository implements TaskResitory {
  async create(email: string, password: string): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  }

  // TODOO
  async delete(userId: string, userTask: string): Promise<User> {
    const user = {
      id: "dsaklhduias",
      email: "dsaklhduias",
      password: "dsaklhduias",
      created_at: new Date(),
    };
    return user;
  }
}

export type User = {
  id: string;
  email: string;
  password: string;
  created_at: Date;
};
