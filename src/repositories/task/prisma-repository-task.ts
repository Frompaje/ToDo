import { prisma } from "@/database/db";
import { Task, TaskResitory } from "@/interface/task-repository";

export class PrismaTaskRepository implements TaskResitory {
  async findById(id: string): Promise<any> {
    const user = await prisma.task.findFirst({
      where: {
        id: id,
      },
    });
    return user;
  }

  async return(taskId: string): Promise<any> {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });
    return task;
  }
  async create(
    title: string,
    description: string,
    status: string,
    userId: string
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

  async delete(userId: string, userTask: string): Promise<Task> {
    const task = await prisma.task.delete({
      where: {
        id: userTask,
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
