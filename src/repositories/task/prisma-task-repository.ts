import { prisma } from "@/database/db";
import { Task, TaskResitory } from "@/interface/task-repository";

export class PrismaTaskRepository implements TaskResitory {
  async findById(userId: string): Promise<any> {
    const user = await prisma.task.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async returnAllTasks(userId: string): Promise<Task[]> {
    const task = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    return task;
  }

  async create(
    userId: string,
    title: string,
    description: string,
    status: string
  ): Promise<Task> {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId,
      },
    });
    return task;
  }

  async delete(userId: string, taskId: string): Promise<Task> {
    const task = await prisma.task.delete({
      where: {
        id: taskId,
        userId,
      },
    });
    return task;
  }

  async deleteMany(userId: string): Promise<any> {
    const task = await prisma.task.deleteMany({
      where: {
        userId,
      },
    });
    return task;
  }

  async update(
    userId: string,
    taskId: string,
    title: string,
    description: string,
    status: string
  ): Promise<Task> {
    const task = await prisma.task.update({
      where: {
        userId,
        id: taskId,
      },
      data: {
        title,
        description,
        status,
      },
    });
    return task;
  }
}
