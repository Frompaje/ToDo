import { TaskResitory } from "@/interface/task-repository";
import { UserRepository } from "@/interface/user-repository";

export class CreateTaskUseCase {
  constructor(
    private taskRepository: TaskResitory,
    private userRepository: UserRepository
  ) {}

  async execute({ userId, title, description, status }: Input) {
    const userExist = await this.userRepository.findById(userId);
    if (!userExist) {
      throw new Error("User does not exist");
    }

    const task = await this.taskRepository.create(
      userId,
      title,
      description,
      status
    );

    return task;
  }
}

type Input = {
  userId: string;
  title: string;
  description: string;
  status: string;
};
