import { User, UserRepository } from "@/interface/user-repository";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const user = await this.userRepository.delete(id);
    return { user };
  }
}

type Input = {
  id: string;
};

type Output = {
  user: User;
};
