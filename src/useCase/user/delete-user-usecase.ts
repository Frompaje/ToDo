import { User, UserRepository } from "@/interface/user-repository";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const userExist = await this.userRepository.findById(id);
    if (!userExist) {
      throw new Error("User does not exist");
    }

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
