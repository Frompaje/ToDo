import { MailRepository } from "@/interface/mail-repository";
import { TokenRepository } from "@/interface/token-repository";
import { User } from "@/interface/type-user";
import { UserRepository } from "@/interface/user-repository";
import { tokenRandom } from "@/repositories/mail/token";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailRepository: MailRepository,
    private tokenRepository: TokenRepository
  ) {}

  async execute({ email, name }: Input): Promise<User> {
    const user = await this.userRepository.create(email, name, tokenRandom());

    if (!user.token) {
      throw new Error("Token does not exist");
    }
    await this.mailRepository.send(email, user.token);

    await this.tokenRepository.saveOTP(user.token, user.id);

    return user;
  }
}
type Input = {
  email: string;
  name: string;
};
