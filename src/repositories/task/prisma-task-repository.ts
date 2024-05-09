import { prisma } from "@/database/db";
import { TaskResitory } from "@/interface/task-repository";
import { Task } from "@/interface/type-task";

export class PrismaTaskRepository implements TaskResitory {
  async findById(taskId: string): Promise<Task | undefined> {
    const tasks = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    return tasks || undefined;
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
