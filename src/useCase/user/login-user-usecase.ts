import { UserRepository } from "@/interface/user-repository";
import { token } from "@/repositories/mail/token";
import { User } from "@prisma/client";

export class LoginUserUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<any> {
    const userExist = await this.userRepository.findById(id);

    const valitaedToken = token();
    console.log(valitaedToken);
    return userExist;
  }
}
