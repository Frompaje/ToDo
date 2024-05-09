import { MailRepository } from "@/interface/mail-repository";
import { TokenRepository } from "@/interface/token-repository";
import { User } from "@/interface/type-user";
import { UserRepository } from "@/interface/user-repository";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailRepository: MailRepository,
    private tokenRepository: TokenRepository
  ) {}

  async execute({ email }: Input): Promise<User | undefined> {
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) {
      throw new Error("Email already exists");
    }
    const user = await this.userRepository.create(email, "Pastor Junior");

    return user || undefined;
  }
}

type Input = {
  email: string;
  name: string;
};
