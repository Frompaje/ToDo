import { MailRepository } from "@/interface/mail-repository";
import { User, UserRepository } from "@/interface/user-repository";
import { token } from "@/repositories/mail/token";
import { FastifyReply } from "fastify";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailRepository: MailRepository
  ) {}

  async execute({ email }: Input): Promise<any> {
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) {
      throw new Error("Email already exists");
    }

    await this.mailRepository.send(email, token());
  }
}

type Input = {
  email: string;
  name: string;
};
