import { TokenRepository } from "@/interface/token-repository";
import { User } from "@/interface/type-user";
import { UserRepository } from "@/interface/user-repository";
import { MailAdapter } from "@/repositories/mail/nodeMail-adapter";
import { tokenRandom } from "@/repositories/mail/token";

export class LoginUserUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository,
    private emailRepository: MailAdapter
  ) {}

  async execute(email: string, token: number): Promise<User> {
    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist.email || !userExist.token) {
      throw new Error("Email or Token does not exist");
    }

    if (token != userExist.token) {
      throw new Error("Unauthenticated token");
    }

    const currentTime = new Date().getTime();
    const tokenTimestamp = userExist.tokenExpiresAt?.getTime();

    if (!tokenTimestamp) {
      throw new Error("Token is not defined");
    }

    if (currentTime > tokenTimestamp) {
      const newTokenTime = await this.tokenRepository.saveOTP(
        tokenRandom(),
        userExist.id
      );

      await this.emailRepository.send(email, newTokenTime.token);
      throw new Error("Token time expired ");
    }

    return userExist;
  }
}
