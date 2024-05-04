import { TaskResitory } from "@/interface/task-repository";

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskResitory) {}

  async execute({ title, description, status, userId }: Input) {
    if (!userId || !title || !description || !status) {
      throw new Error(
        "id, title, description, status is not exist, fill in all the fields"
      );
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
