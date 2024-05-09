import { Task } from "./type-task";

export interface TaskResitory {
  findById(taskId: string): Promise<Task | undefined>;
  returnAllTasks(userId: string): Promise<Task[]>;

  create(
    userId: string,
    title: string,
    description: string,
    status: string
  ): Promise<Task>;

  delete(userId: string, taskId: string): Promise<Task>;

  deleteMany(userId: string): Promise<Task>;

  update(
    userId: string,
    taskId: string,
    title: string,
    description: string,
    status: string
  ): Promise<Task>;
}
