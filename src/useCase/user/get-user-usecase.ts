import { UserRepository } from "@/interface/user-repository";
import { User } from "@prisma/client";

export class GetUserUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const userExist = await this.userRepository.findById(id);

    if (!userExist) {
      throw new Error("User does not exist");
    }
    return userExist;
  }
}
