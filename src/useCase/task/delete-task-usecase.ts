import { Task, TaskResitory } from "@/interface/task-repository";

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskResitory) {}

  async execute(userId: string, userTask: string): Promise<Task> {
    const taskDelete = await this.taskRepository.delete(userId, userTask);
    return taskDelete;
  }
}
