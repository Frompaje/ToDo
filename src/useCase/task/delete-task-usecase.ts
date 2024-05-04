import { Task, TaskResitory } from "@/interface/task-repository";
import { UserRepository } from "@/interface/user-repository";

export class DeleteTaskUseCase {
  constructor(
    private taskRepository: TaskResitory,
    private userRepository: UserRepository
  ) {}

  async execute(userId: string, taskId: string): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);
    const user = await this.userRepository.findById(userId);

    if (!task) {
      throw new Error("Task does not exist");
    }
    if (!user) {
      throw new Error("User does not exist");
    }

    const taskDelete = await this.taskRepository.delete(userId, taskId);
    return taskDelete;
  }
}
