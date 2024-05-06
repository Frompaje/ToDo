import { MailRepository } from "@/interface/mail-repository";
import { User, UserRepository } from "@/interface/user-repository";
import { token } from "@/repositories/mail/token";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailRepository: MailRepository
  ) {}

  async execute({ email, name }: Input): Promise<Output> {
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) {
      throw new Error("Email already exists");
    }

    const user = await this.userRepository.create(email, name);

    await this.mailRepository.send(email, token());

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
