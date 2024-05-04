import { Task, TaskResitory } from "@/interface/task-repository";
import { UserRepository } from "@/interface/user-repository";

export class GetTaskUseCase {
  constructor(
    private taskRepository: TaskResitory,
    private userRepository: UserRepository
  ) {}

  async execute(userId: string): Promise<Task> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User does not exist");
    }

    const tasks = await this.taskRepository.returnAllTask(userId);
    return tasks;
  }
}

// todo task pegar pelo id
