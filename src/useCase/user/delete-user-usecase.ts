import { TaskResitory } from "@/interface/task-repository";
import { User } from "@/interface/type-user";
import { UserRepository } from "@/interface/user-repository";

export class DeleteUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private taskRepository: TaskResitory
  ) {}

  async execute(id: string): Promise<User | undefined> {
    const userExist = await this.userRepository.findById(id);

    if (!userExist) {
      throw new Error("User does not exist");
    }

    await this.taskRepository.deleteMany(id);

    return await this.userRepository.delete(id);
  }
}
