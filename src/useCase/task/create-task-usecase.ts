import { TaskResitory } from "@/interface/task-repository";
import { UserRepository } from "@/interface/user-repository";

export class CreateTaskUseCase {
  constructor(
    private taskRepository: TaskResitory,
    private userRepository: UserRepository
  ) {}

  async execute({ title, description, status, userId }: Input) {
    const userExist = await this.userRepository.findById(userId);
    if (!userExist) {
      throw new Error("User already exists");
    }

    const task = await this.taskRepository.create(
      title,
      description,
      status,
      userId
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
