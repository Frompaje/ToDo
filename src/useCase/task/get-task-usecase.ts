import { Task, TaskResitory } from "@/interface/task-repository";
import { UserRepository } from "@/interface/user-repository";

export class GetTaskUseCase {
  constructor(
    private taskRepository: TaskResitory,
    private userRepository: UserRepository
  ) {}

  async execute(userId: string): Promise<Task> {
    const userExist = await this.userRepository.findById(userId);
    if (!userExist) {
      throw new Error("User does not exist");
    }

    const taskUser = await this.taskRepository.returnAllTasks(userId);

    return taskUser;
  }
}
