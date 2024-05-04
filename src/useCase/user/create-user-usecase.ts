import { User, UserRepository } from "@/interface/user-repository";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: Input): Promise<Output> {
    const userPassword = "95f5afa1-444d-4659-9013-099adf2beda7";
    if (password !== userPassword) {
      throw new Error("password is not exist");
    }

    const user = await this.userRepository.create(email, password);
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
