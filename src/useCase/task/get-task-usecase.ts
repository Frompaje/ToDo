import { Task, TaskResitory } from "@/interface/task-repository";

export class GetTaskUseCase {
  constructor(private taskRepository: TaskResitory) {}

  async execute(taskId: string): Promise<Task> {
    const tasks = await this.taskRepository.return(taskId);
    return tasks;
  }
}
