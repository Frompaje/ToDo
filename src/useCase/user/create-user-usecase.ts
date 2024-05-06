import { User, UserRepository } from "@/interface/user-repository";
import { sendEmail } from "@/sendEmail";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name }: Input): Promise<Output> {
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) {
      throw new Error("Email already exists");
    }
    // todoo amanha eu faço
    sendEmail(email, name);

    const user = await this.userRepository.create(email, name);
    return { user };
  }
}

type Input = {
  email: string;
  name: string;
};

type Output = {
  user: User;
};
