import { TaskResitory } from "@/interface/task-repository";
import { UserRepository } from "@/interface/user-repository";
import { Task } from "@prisma/client";

export class LoginUserUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private taskRepository: TaskResitory
  ) {}

  async execute(email: string, token: string): Promise<Task[]> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email does not exist");
    }

    const tasks = await this.taskRepository.returnAllTasks(user.id);

    return tasks;
  }
}
