import { TaskResitory } from "@/interface/task-repository";
import { User, UserRepository } from "@/interface/user-repository";

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

    await this.taskRepository.deleteMany(id);

    const user = await this.userRepository.delete(id);
    return { user };
  }
}

type Output = {
  user: User;
};
