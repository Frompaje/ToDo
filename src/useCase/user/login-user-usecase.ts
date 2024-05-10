import { User } from "@/interface/type-user";
import { UserRepository } from "@/interface/user-repository";

export class LoginUserUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, token: number): Promise<User> {
    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new Error("Email does not exist");
    }

    const user = await this.userRepository.findById(userExist.id);

    if (token != user.token || !user.token) {
      throw new Error("Unauthenticated token");
    }

    const tokenTime = user.tokenExpiresAt?.getTime();
    const TokenComparation = new Date().getTime();

    if (TokenComparation > tokenTime) {
      console.log("true");
    }

    return user;
  }
}
