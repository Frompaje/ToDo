import { TaskResitory } from "@/interface/task-repository";
import { User, UserRepository } from "@/interface/user-repository";
import { Task } from "@prisma/client";

export class DeleteUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private taskRepository: TaskResitory
  ) {}

  async execute(id: string): Promise<Output> {
    const userExist = await this.userRepository.findById(id);

    if (!userExist) {
      throw new Error("User does not exist");
    }

    const taks = await this.taskRepository.returnAllTasks(id);
    taks.map(async (tasks) => {
      return await this.taskRepository.delete(tasks.userId, tasks.id);
    });

    const user = await this.userRepository.delete(id);
    return { user };
  }
}

type Output = {
  user: User;
};
