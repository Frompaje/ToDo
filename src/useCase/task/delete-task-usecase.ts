import { Task, TaskResitory } from "@/interface/task-repository";

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskResitory) {}

  async execute(userId: string, userTask: string): Promise<Task> {
    const user = await this.taskRepository.findById(userId);

    if (!user) {
      throw new Error("User doe not exist");
    }

    const taskDelete = await this.taskRepository.delete(userId, userTask);
    return taskDelete;
  }
}
