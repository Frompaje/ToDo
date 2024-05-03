import { User, UserRepository } from "@/interface/user-repository";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ password, email }: Input): Promise<Output> {
    const user = await this.userRepository.create(password, email);
    return { user };
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = {
  user: User;
};
