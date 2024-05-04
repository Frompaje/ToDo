import { Task, TaskResitory } from "@/interface/task-repository";
import { UserRepository } from "@/interface/user-repository";

export class UpdateTaskUseCase {
  constructor(
    private taskRepository: TaskResitory,
    private userRepository: UserRepository
  ) {}

  async execute(
    userId: string,
    taskId: string,
    title: string,
    description: string,
    status: string
  ): Promise<Task> {
    const user = await this.userRepository.findById(userId);
    const task = await this.taskRepository.findById(taskId);

    if (!user) {
      throw new Error("User does not exist");
    }
    if (!task) {
      throw new Error("Task does not exist");
    }

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
