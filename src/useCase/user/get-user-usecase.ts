import { UserRepository } from "@/interface/user-repository";
import { token } from "@/repositories/mail/token";
import { User } from "@prisma/client";

export class GetUserUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<any> {
    const userExist = await this.userRepository.findById(id);

    if (!userExist) {
      throw new Error("User does not exist");
    }
    console.log(token());
    return userExist;
  }
}
