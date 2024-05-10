import { TokenRepository } from "@/interface/token-repository";
import { User } from "@/interface/type-user";
import { UserRepository } from "@/interface/user-repository";
import { MailAdapter } from "@/repositories/mail/nodeMail-adapter";
import { tokenRandom } from "@/repositories/mail/token";

export class resendUserUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository,
    private mailRepository: MailAdapter
  ) {}

  async execute(email: string): Promise<User> {
    const userExist = await this.userRepository.findByEmail(email);

    if (email != userExist.email) {
      throw new Error("Email does not exist");
    }

    const newTokenTime = await this.tokenRepository.saveOTP(
      tokenRandom(),
      userExist.id
    );

    await this.mailRepository.send(email, newTokenTime.token);

    return userExist;
  }
}
