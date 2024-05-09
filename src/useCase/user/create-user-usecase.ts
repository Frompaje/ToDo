import { MailRepository } from "@/interface/mail-repository";
import { TokenRepository } from "@/interface/token-repository";
import { UserRepository } from "@/interface/user-repository";
import { token } from "@/repositories/mail/token";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailRepository: MailRepository,
    private tokenRepository: TokenRepository
  ) {}

  async execute({ email }: Input): Promise<any> {
    const emailExist = await this.userRepository.findByEmail(email);
    console.log(emailExist);
    if (emailExist) {
      throw new Error("Email already exists");
    }

    await this.mailRepository.send(email, token());
    await this.userRepository.create(email, "Pastor Junior");
  }
}

type Input = {
  email: string;
  name: string;
};
