import { Task, TaskResitory } from "@/interface/task-repository";

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskResitory) {}

  async execute(
    userId: string,
    taskId: string,
    title: string,
    description: string,
    status: string
  ): Promise<Task> {
    const taskUpdate = await this.taskRepository.update(
      userId,
      taskId,
      title,
      description,
      status
    );
    return taskUpdate;
  }
}
