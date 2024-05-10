import { TaskResitory } from "@/interface/task-repository";
import { User } from "@/interface/type-user";
import { UserRepository } from "@/interface/user-repository";
import { Task } from "@prisma/client";
import { date } from "zod";

export class LoginUserUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, token: number): Promise<User> {
    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new Error("Email does not exist");
    }

    const user = await this.userRepository.findById(userExist.id);
    if (user.token == Number(new Date())) {
      console.log("Hello");
    }
    if (token != user.token) {
      throw new Error("Unauthenticated token");
    }

    if (!user.token) {
      throw new Error("Token does not existe");
    }

    return user;
  }
}
